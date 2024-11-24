<?php

namespace App\Packages\Learn\Entities;

class JournalLesson
{
    public int $id;

    public int $user_id;

    public int $course_id;

    public int $lesson_id;

    public int $tries;

    public string $status;

    public array $answers;

    public int|null $instructor_id;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            if ($key === 'answers') {
                $value = json_decode($value, true);
            }
            $this->{$key} = $value;
        }
    }
}
