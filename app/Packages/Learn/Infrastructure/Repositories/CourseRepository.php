<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Course;
use App\Packages\Learn\Entities\Lesson;
use Illuminate\Database\Eloquent\Builder;

class CourseRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Learn\Course';
    }

    public function mapProps($model)
    {
        return new Course($model->toArray());
    }

    public function lessons($course_id, $onlyActive = false): array
    {
        return $this->model
            ->find($course_id)
            ->lessons()
            ->when($onlyActive, fn (Builder $query) => $query->where('active', 1))
            ->get()
            ->map(function ($item) {
                return new Lesson($item->toArray());
            })->toArray();
    }
}
