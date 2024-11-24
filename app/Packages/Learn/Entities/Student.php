<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Common\Domain\UserDTO;

class Student
{
    public $id;

    public function __construct(UserDTO $user)
    {
        $this->id = $user->id;
    }

    public function getEndedCourses()
    {

    }

    public function getWorkingCourses()
    {

    }
}
