<?php

namespace App\Packages\Learn\UseCases;

use App\Models\Learn\CourseGroup;
use App\Models\Learn\Curriculum;
use App\Packages\Common\Application\Interfaces\IAuthorisationService;
use App\Packages\Common\Application\Interfaces\IUserService;
use App\Packages\Common\Infrastructure\Services\MediaService;
use App\Packages\Learn\Entities\Course;
use App\Packages\Learn\Entities\Lesson;
use App\Packages\Learn\Entities\QuestionType;
use App\Packages\Learn\Infrastructure\Repositories\CourseGroupRepository;
use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\CurriculumRepository;
use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;
use App\Packages\Learn\Infrastructure\Repositories\QuestionRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class LearnService implements LearnServiceInterface
{
    public function __construct(
        protected IAuthorisationService $authService,
        protected IUserService $userService,
        protected JournalService $journalService,
        protected MediaService $mediaService
    ) {
    }

    public function getCourses($onlyActive = true): array
    {
        $user_id = $this->userService->currentUser()->id;

        return $this->getCoursesFor($user_id, $onlyActive);
    }

    public function getCoursesFor(int $user_id, $onlyActive = true): array
    {
        $rep = new CourseRepository();

        if ($onlyActive) {
            $rep = $rep->query(fn ($model) => ($model->where('active', '=', 1)));
        }
        $list = $rep->all();

        $res = array_filter($list, fn ($item) => ($this->authService->authorizedFor($user_id, "LC{$item->id}", 'read')));

        // count progress for course
        $res = array_map(function ($item) use ($user_id) {
            $item->progress = $this->journalService->getCourseProgress($user_id, $item->id);

            return $item;
        }, $res);

        return array_values($res);
    }

    public function getCourse(int $id): Course
    {
        // $self = LearnService::getInstance();
        //        AuthorisationService::authorize("LC{$id}", 'read');

        $rep = new CourseRepository();
        $course = $rep->find($id);
        $course->lessons = $rep->lessons($id, true);
        //        $course->lessons = array_filter($course->lessons, fn($item) => ($self->authService::authorized("LL{$item->id}", 'read')));

        return $course;
    }

    /**
     * @return array
     */
    public function getCourseGroups(): Collection
    {
        //        $rep = new CourseGroupRepository();
        //        $list = $rep->all();
        $list = CourseGroup::where('active', 1)->get();

        return $list;
    }

    public function getCurriculums()
    {

        $list = Curriculum::with('courses')
            ->where('active', true)
            ->get()
            ->filter(fn ($e) => ($this->authService->authorized("LP{$e->id}", 'read')))
            ->load('courses')
            ->toArray();

        $user_id = $this->userService->currentUser()->id;
        $list = array_map(function ($e) use ($user_id) {
            // удаляем из курсов те, к которым нет доступа и неактивные
            $e['courses'] = array_filter($e['courses'], function ($e) {
                return $e['active'] && $this->authService->authorized("LC{$e['id']}", 'read');
            });
            $e['courses'] = array_values($e['courses']); // перенумеровываем массив
            // set progress for each course
            foreach ($e['courses'] as $key => $course) {
                $e['courses'][$key]['progress'] = $this->journalService->getCourseProgress($user_id, $course['id']);
            }

            return count($e['courses']) ? $e : null; // если доступных курсов нет, убираем программу
        }, $list);

        $list = array_filter($list, fn ($e) => ! is_null($e)); // убираем пустые элементы

        return array_values($list);
    }

    public function getCurriculum(int $id)
    {
        //        AuthorisationService::authorize("LP{$id}", 'read');
        $rep = new CurriculumRepository();
        $list = $rep->find($id);
        $list->courses = $rep->courses($id);

        return $list;
    }

    public function runLesson(int $cid, int $lid)
    {
        // check permissions
        // $this->authService->authorize("LL{$id}", 'read');

        // fill lesson questions and answers data
        $rep = new LessonRepository();
        $lesson = $rep->find($lid);

        // check lesson timeout
        // if (!JournalService::checkLessonTimeout($cid, $lid)) {
        //     JournalService::setLessonStatus($cid, $lid, 'fail');
        //     return false;
        // }

        $q = collect($rep->questions($lid));
        // remove not active questions
        $lesson->questions = $q->filter(fn ($e) => $e->active)->values()->toArray();
        $lesson->files = $rep->filesData($lid);

        $rep = new QuestionRepository();
        foreach ($lesson->questions as $value) {
            $value->answers = $rep->answers($value->id);
            // delete hint
            unset($value->hint);
            // delete right answer from the frontend side
            foreach ($value->answers as $val) {
                unset($val->correct);
            }
        }

        return $lesson;
    }

    /**
     * Check the answers of the question and
     *
     * @return bool|void
     */
    public function checkLesson(int $cid, int $lid, $data): bool
    {
        // check permissions
        // $self = LearnService::getInstance();
        //        if (!$self->authService::authorized("LL{$lid}", 'read')) {
        //            throw new \Error('No access');
        //        }

        $rep = new LessonRepository();
        $lesson = $rep->find($lid);
        $lesson->questions = $rep->questions($lid);

        $result = 'done';
        $pending = false; // there is a text question, need human check

        // check timer
        if ((isset($data['timeout']) && $data['timeout'] === true) ||
                ! JournalService::checkLessonTimeout($cid, $lid)) {
            JournalService::setLessonStatus($cid, $lid, 'fail');

            return false;
        }

        $storeAnswersArr = [];

        $rep = new QuestionRepository();
        // check all questions
        foreach ($lesson->questions as $question) {
            if (! $question->active) {
                continue;
            }
            $question->answers = $rep->answers($question->id);

            // prepare for saving
            $storeAnswersArr[$question->id] = [
                'question_id' => $question->id,
                'question' => $question->name,
                'type' => $question->type,
                'hint' => $question->hint,
            ];

            switch ($question->type) {
                case QuestionType::RADIO:
                    // only one answer
                    $answer = $data["$question->id"]['answer'] ?? false;
                    $storeAnswersArr[$question->id]['answer'] = $answer;
                    $rightAnswer = array_filter($question->answers, fn ($item) => ($item->correct));
                    $rightAnswer = $rightAnswer[0] ?? false;
                    if ($rightAnswer === false) {
                        throw new Exception('No answers for the RADIO type question!');
                    }
                    // check one correct answer
                    if ($rightAnswer->id != $answer) {
                        $result = 'fail';
                    }
                    break;
                case QuestionType::CHECKBOX:
                    // array of answers or []
                    $answer = $data["$question->id"]['answer'] ?? [];
                    $allAnswers = collect($question->answers)->filter(fn ($e) => $e->active);
                    $storeAnswersArr[$question->id]['answer'] = $answer;
                    // check all possible answers
                    foreach ($allAnswers as $ans) {
                        if ($ans->correct) {
                            // must be in users's answer
                            if (! in_array($ans->id, $answer)) {
                                $result = 'fail';
                            }
                        } else {
                            // mustn't be in user's answer
                            if (in_array($ans->id, $answer)) {
                                $result = 'fail';
                            }
                        }
                    }
                    break;
                case QuestionType::TEXT:
                    // needed to check by instructor
                    $answer = $data["$question->id"];
                    $storeAnswersArr[$question->id]['answer'] = $answer['answer'] ?? '';
                    $storeAnswersArr[$question->id]['comment'] = $answer['comment'] ?? '';
                    $storeAnswersArr[$question->id]['done'] = $answer['done'] ?? '';
                    $pending = true;
                    break;
                case QuestionType::FILE:
                    if (! isset($data["$question->id"]['answer'])) {
                        break;
                    }
                    $file = array_shift($data["$question->id"]['answer']);
                    if ($file instanceof UploadedFile) {
                        if (! $file->isValid()) {
                            throw new \InvalidArgumentException($file->getErrorMessage());
                        }
                        // delete old saved file
                        $answers = JournalService::getAnswers($cid, $lid);
                        $old_id = $answers->{$question->id}?->answer?->file_id ?? false;
                        $this->mediaService->deleteMedia($old_id);
                        // save new file
                        $file_id = $this->mediaService->saveMedia($file, 'LC', 'Answers', 'answers');
                        $file_path = $this->mediaService->getMedia($file_id)->path;
                        $storeAnswersArr[$question->id]['answer']['file_id'] = $file_id;
                        $storeAnswersArr[$question->id]['answer']['file_name'] = $file->getClientOriginalName();
                        $storeAnswersArr[$question->id]['answer']['file_path'] = $file_path;
                    }
                    $pending = true;
                    break;
                default:
                    assert('Unknown question type.');
            }
        }

        if ($result == 'done' && $pending) {
            $result = 'pending';
        }

        JournalService::storeAnswers($cid, $lid, $storeAnswersArr);
        JournalService::setLessonStatus($cid, $lid, $result);

        return ($result == 'done') || ($result == 'pending');
    }

    public function nextLesson(int $cid, int $lid): Lesson|bool
    {
        //todo: move to entity
        $course = self::getCourse($cid);
        $rep = new CourseRepository();
        $lessons = $course->lessons;
        $lessons_ids = array_map(fn ($e) => ($e->id), $lessons);
        $pos = array_search($lid, $lessons_ids);
        if ($pos === false) {
            throw new \Exception('Error while next lesson finding...');
        }

        if ($pos == count($lessons_ids) - 1) {
            return false;
        }

        return $lessons[$pos + 1];
    }

    public function getLessons()
    {
        $rep = new LessonRepository();
        $lessons = $rep->all();
        foreach ($lessons as $lesson) {
            $lesson->courses = $rep->courses($lesson->id);
        }

        return $lessons;
    }

    // public function getLesson(int $lid): Lesson
    // {
    //     $rep = new LessonRepository();
    //     $lesson = $rep->find($lid);
    //     $lesson->questions = $rep->questions($lid);
    //     return $lesson;
    // }

    public function getQuestions()
    {
        $rep = new QuestionRepository();

        return $rep->all();
    }
}
