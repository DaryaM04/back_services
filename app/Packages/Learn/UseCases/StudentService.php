<?php

namespace App\Packages\Learn\UseCases;

use App\Models\Learn\Course;
use App\Models\User;
use App\Packages\Common\Application\Interfaces\IUserService;

class StudentService
{
    public function __construct(
        public IUserService $userService,
        public LearnService $learnService,
        public JournalService $journalService
    ) {
    }

    /**
     * Student's list
     */
    public function getStudentsList($params): array
    {
        $filters = $params['filters'] ?? [];
        $paginatedList = User::select(['id', 'name', 'last_name', 'avatar'])
            ->where($filters);

        if (! empty($params['sortBy'])) {
            $paginatedList = $paginatedList->orderBy($params['sortBy'], $params['sortDir']);
        }

        $paginatedList = $paginatedList->paginate($params['perPage']);

        // counting cources
        $paginatedList->getCollection()->each(function ($e) {
            $courses = collect($this->learnService->getCoursesFor($e->id));

            $started = 0;
            $finished = 0;
            $courses->each(function ($item) use ($e, &$started, &$finished) {
                $progress = $item->progress;
                if ($progress == 100) {
                    $finished++;
                }
                $_started = $progress = $this->journalService->isCourseStarted($e->id, $item->id);
                if ($_started) {
                    $started++;
                }
            });

            $e['assignedCourses'] = $courses->count();
            $e['startedCourses'] = $started;
            $e['finishedCourses'] = $finished;
        });

        return $paginatedList->toArray();
    }

    /**
     * Student's info
     */
    public function getStudentInfo(int $user_id): array
    {
        $courses = collect($this->learnService->getCoursesFor($user_id));

        $courses->each(function ($e) use ($user_id) {
            $progress = $this->journalService->getCourseProgress($user_id, $e->id);
            $e->status = $progress === 100 ? 'done' : 'in_progress';
            $e->is_started = $progress = $this->journalService->isCourseStarted($user_id, $e->id);
            if (! $e->is_started) {
                $e->status = 'not_started';
            }

            $e->lessons = Course::find($e->id)
                ->lessons()
                ->select([
                    'learn_lessons.id',
                    'name',
                    'description',
                ])
                ->where(['active' => 1])
                ->get();

            $e->lessons->each(function ($lesson) use ($e, $user_id) {
                $journalLesson = $this->journalService->getLessonForUser($user_id, $e->id, $lesson->id);
                $lesson->status = $journalLesson?->status ?? ''; //$this->journalService->getLessonStatusForUser($user_id, $e->id, $lesson->id);
                $lesson->journal_lesson_id = $journalLesson?->id;
            });

        });

        $user = $this->userService->getUser($user_id);
        $studentInfo = [
            'id' => $user_id,
            'name' => $user->FIO(),
            'avatar' => $user->avatar,
            'courses' => $courses,
        ];

        return $studentInfo;

    }
}
