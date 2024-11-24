<?php

namespace App\Packages\Learn\Entities;

//use App\Packages\Learn\Infrastructure\Repositories\CourseGroupRepository;

class CourseGroup
{
    public $id;

    public $name;

    public $description;

    public $active;

    public $sort;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    //    function courses() {
    //        $rep = new CourseGroupRepository();
    //        return $rep->courses($this->id);
    //    }
}
