<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Answer;

class AnswerRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\Answer';
    }

    public function mapProps($model)
    {
        return new Answer($model->toArray());
    }
}
