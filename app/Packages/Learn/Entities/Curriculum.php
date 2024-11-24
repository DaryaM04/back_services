<?php

namespace App\Packages\Learn\Entities;

//use App\Packages\Learn\Infrastructure\Repositories\CurriculumRepository;

class Curriculum
{
    public $id;

    public $name;

    public $description;

    public $active;

    public $sort;

    public $courses;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    //    function fetchCourses() {
    //        $rep = new CurriculumRepository();
    //        $this->courses = $rep->courses($this->id);
    //    }
}
