<?php

namespace App\Packages\Learn\UseCases;

use App\Models\Learn\Course;
use App\Models\Learn\JournalLesson;
use App\Models\Learn\Lesson;
use Illuminate\Support\Carbon;

class CourseStatus
{
    public const NEW = 'new';

    public const IN_PROGRESS = 'in_progress';

    public const DONE = 'done';
}

class LessonStatus
{
    public const NEW = 'new';

    public const TIMER = 'timer';

    public const PENDING = 'pending';

    public const DONE = 'done';

    public const FAIL = 'fail';

    public const BLOCKED = 'blocked';
}

class JournalService
{
    public static function getLesson(int $cid, int $lid): JournalLesson|null
    {
        $user_id = auth()->user()->id;
        $rec = JournalLesson::where([
            'user_id' => $user_id,
            'course_id' => $cid,
            'lesson_id' => $lid,
        ])->first();

        return $rec;
    }

    public static function getAnswers(int $cid, int $lid): \stdClass|null
    {
        $rec = self::getLesson($cid, $lid);
        $answers = $rec?->answers;

        return $answers;
    }

    /**
     * Store answers for a lesson
     *
     * @param  \stdClass  $answers
     */
    public static function storeAnswers(int $cid, int $lid, array $answers): void
    {
        $user_id = auth()->user()->id;

        $rec = self::getLesson($cid, $lid);
        if (! $rec) {
            $rec = \App\Models\Learn\JournalLesson::create([
                'user_id' => $user_id,
                'course_id' => $cid,
                'lesson_id' => $lid,
            ]);
        }

        $rec->tries = $rec->tries ? $rec->tries + 1 : 1;
        $rec->answers = $answers;
        $rec->save();
    }

    /**
     * Get lesson's statuses by course id
     */
    public static function getLessonsStatuses(int $cid): array|null
    {
        $user_id = auth()->user()->id;
        $rec = JournalLesson::select('lesson_id as id', 'status')
            ->where([
                'user_id' => $user_id,
                'course_id' => $cid,
            ])
            ->get()
            ->toArray();

        return $rec;
    }

    public static function getLessonsStatusesForTeacher(): array|null
    {
        // TODO: Переделать на SQL
        $lessonsStatuses = JournalLesson::query()
            ->select('lesson_id as id', 'status')
            ->get();

        $done = 0;
        $fail = 0;
        $pending = 0;

        $lessonsStatuses->each(function ($e) use (&$done, &$fail, &$pending) {
            switch ($e->status) {
                case 'done':
                    $done++;

                    return;
                case 'fail':
                    $fail++;

                    return;
                case 'pending':
                    $pending++;

                    return;
            }
        });

        return [$done, $fail, $pending];
    }

    public static function getCoursesStatusesForTeacher(): array|null
    {
        $courses = Course::all(['*']);

        $done = 0;
        $fail = 0;
        $pending = 0;

        $courses->each(function ($course) use (&$done, &$fail, &$pending) {
            $statuses = JournalLesson::query()
                ->where([
                    'course_id' => $course->id,
                ])
                ->pluck('status')
                ->toArray();

            if ($course->lessons()->count() === 0) {
                return;
            }

            // If not started
            if (empty($statuses)) {
                $fail++;

                return;
            }

            if (
                ! in_array('fail', $statuses, true)
                && ! in_array('pending', $statuses, true)
                && in_array('done', $statuses, true)
            ) {
                $done++;

                return;
            } elseif (
                in_array('pending', $statuses, true)
                || in_array('done', $statuses, true)
                || in_array('fail', $statuses, true)
            ) {
                $pending++;

                return;
            }
        });

        return [$done, $fail, $pending];
    }

    public static function getLessonStatus(int $cid, int $lid): string|null
    {
        $user_id = auth()->user()->id;

        return self::getLessonStatusForUser($user_id, $cid, $lid);
    }

    public static function getLessonStatusForUser(int $uid, int $cid, int $lid): string|null
    {
        $rec = \App\Models\Learn\JournalLesson::where([
            'user_id' => $uid,
            'course_id' => $cid,
            'lesson_id' => $lid,
        ])->first();

        return $rec?->status;
    }

    public static function getLessonForUser(int $uid, int $cid, int $lid): object|null
    {
        $rec = \App\Models\Learn\JournalLesson::where([
            'user_id' => $uid,
            'course_id' => $cid,
            'lesson_id' => $lid,
        ])->first();

        return $rec;
    }

    public static function checkLessonTimeout(int $cid, int $lid): bool
    {
        $lesson = Lesson::findOrFail($lid);
        if ($lesson->options?->delayTime ?? false) {
            $min = $lesson?->options?->delayTime ?? 0;
            $timeForPassing = $min * 60 * 1000;

            $journalLesson = JournalService::getLesson($cid, $lid);
            if ($lesson->status === 'new') {
                $startedAt = Carbon::parse($journalLesson->updated_at);
                $timeDiff = now()->micro - $startedAt;
                if ($timeDiff >= $timeForPassing) {
                    return false;
                }
            }
        }

        return true;
    }

    public static function getLessonTimerStatus($cid, $lesson): int|bool
    {
        $timeToComplete = $lesson->options?->delayTime ?? false;
        if (! $timeToComplete) {
            return false;
        }

        $timeToCompleteInMilliseconds = $timeToComplete * 60 * 1000;

        $journalLesson = JournalService::getLesson($cid, $lesson->id);

        if (! $journalLesson) {
            return false;
        }

        if ($journalLesson->status !== LessonStatus::TIMER) {
            return false;
        }

        $started = Carbon::parse($journalLesson->updated_at);
        $diffInMilliseconds = now()->diffInMilliseconds($started);

        return $diffInMilliseconds < $timeToCompleteInMilliseconds ? $timeToCompleteInMilliseconds - $diffInMilliseconds : false;
    }

    public static function getLessonTimedOut($cid, $lesson): array
    {
        if (! ($lesson->options)) {
            return [];
        }
        $timeToComplete = $lesson->options?->delayTime ?? 0;
        $timeToCompleteInMilliseconds = $timeToComplete * 60 * 1000;

        $data = [
            'course_id' => $cid,
            'lesson_id' => $lesson->id,
            'user_id' => auth()->user()->id,
        ];

        $journalLesson = JournalLesson::query()->where($data)->first();

        if (! $journalLesson) {
            return [
                'status' => 'notStarted',
                'time' => $timeToCompleteInMilliseconds,
            ];
        }

        $status = $journalLesson->status;

        if ($status !== LessonStatus::NEW) {
            return [
                'status' => 'completed',
                'time' => null,
            ];
        }

        $started = Carbon::parse($journalLesson->updated_at);
        $diffInMilliseconds = now()->diffInMilliseconds($started);

        if ($diffInMilliseconds <= 2000) {
            return [
                'status' => 'begin',
                'time' => $timeToCompleteInMilliseconds,
            ];
        }

        return $timeToCompleteInMilliseconds < $diffInMilliseconds
            ? ['status' => 'ended', 'time' => null]
            : ['status' => 'begin', 'time' => $timeToCompleteInMilliseconds - $diffInMilliseconds];
    }

    public static function setLessonStatus(int $cid, int $lid, string $status): void
    {
        $user_id = auth()->user()->id;

        \App\Models\Learn\JournalLesson::updateOrCreate([
            'user_id' => $user_id,
            'course_id' => $cid,
            'lesson_id' => $lid,
        ], ['status' => $status]);

    }

    /**
     * Course progress
     */
    public function getCourseProgress(int $uid, int $cid): int
    {
        $course = Course::with(['lessons'])->find($cid);

        $all = $course->lessons()->count();

        $done = 0;
        $percent = 0;

        $course->lessons()->each(function ($e) use (&$done, $uid, $cid) {
            $res = JournalLesson::where([
                'user_id' => $uid,
                'course_id' => $cid,
                'lesson_id' => $e->id,
                'status' => 'done',
            ])->count();
            if ($res) {
                $done++;
            }
        });

        if ($all !== 0 && $done !== 0) {
            $percent = intval(floatval($done / $all) * 100);
        }

        return $percent;
    }

    /**
     * Is course started
     */
    public function isCourseStarted(int $uid, int $cid): bool
    {
        $res = JournalLesson::where([
            'user_id' => $uid,
            'course_id' => $cid,
        ])->count();

        return $res > 0;
    }

    /**
     * Lessons for check count
     */
    public function getStudentsAnswersCount(): int
    {
        return JournalLesson::query()->where('status', LessonStatus::PENDING)->count();
    }

    /**
     * Lessons for check
     */
    public function getTeacherLessons($params): array
    {
        $paginatedList = JournalLesson::query()
            ->with(['user', 'course', 'lesson'])
            // ->where('status', 'pending')
            ->whereHas('user', function ($q) use ($params) {
                // get users filter
                $filter = array_filter($params['filters'], fn ($e) => ($e[0] === 'user'));
                $filter = array_shift($filter);
                $cond = $filter[2] ?? '%%';
                $q->where('name', 'like', $cond)
                    ->orWhere('last_name', 'like', $cond);
            })
            ->whereHas('course', function ($q) use ($params) {
                $filter = array_filter($params['filters'], fn ($e) => ($e[0] === 'course.name'));
                $filter = array_shift($filter);
                $cond = $filter[2] ?? '%%';
                $q->where('name', 'like', $cond);
            })
            ->whereHas('lesson', function ($q) use ($params) {
                $filter = array_filter($params['filters'], fn ($e) => ($e[0] === 'lesson.name'));
                $filter = array_shift($filter);
                $cond = $filter[2] ?? '%%';
                $q->where('name', 'like', $cond)
                    ->where('status', '=', LessonStatus::PENDING);
            });

        if (! empty($params['sortBy'])) {
            $paginatedList = $paginatedList->orderBy($params['sortBy'], $params['sortDir']);
        }

        $paginatedList = $paginatedList->paginate($params['perPage']);

        return $paginatedList->toArray();
    }
}
