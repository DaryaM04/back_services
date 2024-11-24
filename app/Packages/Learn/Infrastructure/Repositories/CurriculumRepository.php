<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Course;
use App\Packages\Learn\Entities\Curriculum;

class CurriculumRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\Curriculum';
    }

    public function mapProps($model)
    {
        return new Curriculum($model->toArray());
    }

    public function courses($curriculum_id)
    {
        return $this->model->find($curriculum_id)->courses()->get()->map(function ($item) {
            return new Course($item->toArray());
        })->toArray();
    }
}
