<?php

namespace App\Packages\Common\Infrastructure\Repositories;

use App\Packages\Common\Domain\Team;
use App\Packages\Common\Domain\UserDTO;

//use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

class TeamRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\Models\Common\Team';
    }

    public function mapProps($model)
    {
        return new Team($model->toArray());
    }

    public function users($team_id)
    {
        return $this->model->find($team_id)->users->map(function ($item) {
            return new UserDTO($item->toArray());
        })->toArray();
    }
}
