<?php

namespace App\Packages\Learn\Entities;

//use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;

class Course
{
    public $id;

    public $name;

    public $description;

    public $image;

    public $options;

    public $group_id;

    public $active;

    public $sort;

    public $lessons;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    /**
     * @param  int  $id
     * @return Course
     */
    //    public static function getById(int $id): Course
    //    {
    //        $rep = new CourseRepository();
    //        $course = $rep->find($id);
    //        return $course;
    //    }

    //    function fetchLessons()
    //    {
    //        $rep = new CourseRepository();
    //        $this->lessons = $rep->lessons($this->id);
    //    }
}
