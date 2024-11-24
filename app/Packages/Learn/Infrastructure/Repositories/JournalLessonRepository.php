<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\JournalLesson;

class JournalLessonRepository extends AbstractRepository
{
    /**
     * {@inheritDoc}
     */
    public function model()
    {
        return 'App\Models\Learn\JournalLesson';
    }

    /**
     * {@inheritDoc}
     */
    public function mapProps($model)
    {
        return new JournalLesson($model->toArray());
    }
}
