<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    // get parameters from query
    protected function getQueryParameters(Request $request): array
    {
        $sortBy = $request->sortby; // without default value to use SortGlobalScope
        $sortDir = $request->sortdir ?? 'asc';
        $perPage = min($request->perpage ?? 10, 100); //max per page records = 100

        $filters = $request->filters ?? [];
        $arr = [];
        if (! empty($filters)) {
            foreach ($filters as $key => $value) {
                $arr[] = [$key, 'like', "%{$value}%"];
            }
        }
        $filters = $arr;

        $except = $request->except ?? [];
        foreach ($except as $value) {
            $filters[] = ['id', '!=', "$value"];
        }

        $res = [];

        if (! empty($sortBy)) {
            $res['sortBy'] = $sortBy;
            $res['sortDir'] = $sortDir;
        }

        $res['filters'] = $filters;

        $res['perPage'] = $perPage;

        return $res;
    }

    // get paginated list with filters
    protected function getIndexList($class, Request $request,
        $columns = [],
        $excludedColumns = [],
        $withRelations = [],
        $sort = []
    ): LengthAwarePaginator {

        $params = $this->getQueryParameters($request);

        if (! empty($withRelations)) {
            $res = $class::with($withRelations)->where($params['filters']);
        } else {
            $res = $class::where($params['filters']);
        }

        $res = $res->where($params['filters']);

        if (! empty($columns)) {
            $res = $res->select($columns);
        }

        if (! empty($excludedColumns)) {
            $res = $res->exclude($excludedColumns);
        }

        if (! empty($params['sortBy'])) {
            $res = $res->orderBy($params['sortBy'], $params['sortDir']);
        } elseif (! empty($sort['sortBy'])) {
            $res = $res->orderBy($sort['sortBy'], $sort['sortDir']);
        }

        return $res->paginate($params['perPage']);
    }
}
