<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    public function index(Request $request): Response|LengthAwarePaginator
    {
        if ($request->has('page')) {
            $paginatedList = $this->getIndexList(City::class, $request, 0, 0, 0, [
                'sortBy' => 'created_at',
                'sortDir' => 'desc',
            ]);

            return $paginatedList;
        }

        return Inertia::render('Admin/City/index');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/City/EditCity');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_ru' => ['required', 'string', 'max:255'],
            'name_he' => ['required', 'string', 'max:255'],
            'name_ar' => ['required', 'string', 'max:255'],
        ]);
        $input = $request->all();
        City::query()->create($input);

        return Redirect::route('admin.cities.index')->with([
            'message' => trans('city.created'),
        ]);
    }

    public function edit(City $city): Response
    {
        return Inertia::render('Admin/City/EditCity', compact('city'));
    }

    public function update(City $city, Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_ru' => ['required', 'string', 'max:255'],
            'name_he' => ['required', 'string', 'max:255'],
            'name_ar' => ['required', 'string', 'max:255'],
        ]);

        $input = $request->all();
        $city->update($input);

        return Redirect::route('admin.cities.index')->with([
            'message' => trans('city.updated'),
        ]);
    }

    public function destroy(City $city): RedirectResponse
    {
        $city->delete();

        return Redirect::route('admin.cities.index')->with([
            'message' => trans('city.deleted'),
        ]);

    }
}
