<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Answer;
use App\Packages\Learn\Entities\Question;

class QuestionRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\Question';
    }

    public function mapProps($model)
    {
        return new Question($model->toArray());
    }

    public function answers($question_id)
    {
        return $this->model->find($question_id)->answers()->get()->map(function ($item) {
            return new Answer($item->toArray());
        })->toArray();
    }
}
