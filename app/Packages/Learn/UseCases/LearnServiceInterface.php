<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Entities\Course;

interface LearnServiceInterface
{
    /**
     * list of courses
     */
    public function getCourses(): array;

    /**
     * Course details
     */
    public function getCourse(int $id): Course;
}
