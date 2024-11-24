<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Lesson;
use App\Packages\Learn\Entities\Question;

class LessonRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\Lesson';
    }

    public function mapProps($model)
    {
        return new Lesson($model->toArray());
    }

    public function questions($lesson_id)
    {
        return $this->model->find($lesson_id)->questions()->get()->map(function ($item) {
            //            return new Question($item->toArray());
            return app()->make(Question::class, ['prop' => $item->toArray()]);
        })->toArray();
    }

    public function filesData($lesson_id)
    {
        return $this->model->find($lesson_id)->filesData();
    }

    public function courses($lesson_id)
    {
        return $this->model->find($lesson_id)->courses()->get()->toArray();
    }
}
