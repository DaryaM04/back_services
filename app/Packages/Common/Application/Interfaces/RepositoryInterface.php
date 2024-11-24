<?php

namespace App\Packages\Common\Application\Interfaces;

// https://bosnadev.com/2015/03/07/using-repository-pattern-in-laravel-5/

interface RepositoryInterface
{
    public function query($applyFilter = null, $columns = ['*']): RepositoryInterface;

    public function all($columns = ['*']): array;

    //    public function findBy($field, $value, $columns = array('*'));

    public function paginate($perPage = 10, $columns = ['*']);

    public function find($id, $columns = ['*']): object;

    public function create(array $data): object;

    public function update(array $data, $id): bool;

    public function delete($id): bool;
}
