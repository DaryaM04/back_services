<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Models\Learn\Question;
use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

class JournalQuestionsRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\JournalQuestion';
    }

    public function mapProps($model)
    {
        return new Question($model->toArray());
    }
}
