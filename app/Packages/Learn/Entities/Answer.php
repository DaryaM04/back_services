<?php

namespace App\Packages\Learn\Entities;

class Answer
{
    public $id;

    public $name;

    public $correct;

    public $question_id;

    public $active;

    public $sort;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }
}
