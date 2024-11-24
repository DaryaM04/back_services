<?php

namespace App\Packages\Common\Infrastructure\Repositories;

use App\Exceptions\RepositoryException;
use App\Packages\Common\Application\Interfaces\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

abstract class AbstractRepository implements RepositoryInterface
{
    /**
     * @var App
     */
    //    private $app;

    protected $model;

    /**
     * @param  App  $app
     *
     * @throws \App\Exceptions\RepositoryException
     */
    public function __construct(/*?App $app*/)
    {
        //        $this->app = $app;
        $this->makeModel();
    }

    /**
     * @return Model
     *
     * @throws RepositoryException
     */
    public function makeModel()
    {
        $model = App::make($this->model());

        if (! $model instanceof Model) {
            throw new RepositoryException("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }

        return $this->model = $model;
    }

    /**
     * Specify Model class name
     *
     * @return mixed
     */
    abstract public function model();

    /**
     * Mapping to DTO
     *
     * @return mixed
     */
    abstract public function mapProps($model);

    /**
     * Query with callback
     *
     * @param  array  $columns
     * @param  array  $columns
     * @return mixed
     */
    public function query($applyFilter = null, $columns = ['*']): RepositoryInterface
    {

        if (is_callable($applyFilter)) {
            $this->model = $applyFilter($this->model);
        }

        return $this;
        // return $query->get($columns)->map(function ($item) {
        //     return $this->mapProps($item);
        // });
    }

    /**
     * @param  array  $columns
     * @return mixed
     */
    public function all($columns = ['*']): array
    {
        return $this->model->get($columns)->map(function ($item) {
            return $this->mapProps($item);
        })->toArray();
    }

    /**
     * @param  int  $perPage
     * @param  array  $columns
     * @return mixed
     */
    public function paginate($perPage = 10, $columns = ['*'])
    {
        return $this->model->paginate($perPage, $columns);
    }

    /**
     * @return mixed
     */
    public function create(array $data): object
    {
        return $this->mapProps($this->model->create($data));
    }

    /**
     * @param  string  $attribute
     * @return mixed
     */
    public function update(array $data, $id, $attribute = 'id'): bool
    {
        return $this->model->where($attribute, '=', $id)->update($data);
    }

    /**
     * @return mixed
     */
    public function delete($id): bool
    {
        return $this->model->destroy($id);
    }

    /**
     * @param  array  $columns
     * @return mixed
     */
    public function find($id, $columns = ['*']): object
    {
        return $this->mapProps($this->model->findOrFail($id, $columns));
    }

    //    /**
    //     * @param $attribute
    //     * @param $value
    //     * @param array $columns
    //     * @return mixed
    //     */
    //    public function findBy($attribute, $value, $columns = array('*'))
    //    {
    //        return $this->mapProps($this->model->where($attribute, '=', $value)->get($columns));
    //    }

}
