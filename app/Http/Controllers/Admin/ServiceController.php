<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\CreateServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response|LengthAwarePaginator
    {
        $services = Service::all();
        return Inertia::render('Admin/Service/index', compact('services'));
    }

    public function create(): Response
    {
        $services = Service::all()->map(fn ($service) => $service->localized());
        return Inertia::render('Admin/Service/EditService', compact('services'));
    }

    public function store(CreateServiceRequest $request): RedirectResponse
    {
        Service::query()->create($request->validated());

        return Redirect::route('admin.services.index')->with([
            'message' => trans('service.created'),
        ]);;
    }

    public function edit(Service $service): Response
    {
        $services = Service::all()->map(fn ($service) => $service->localized());
        return Inertia::render('Admin/Service/EditService', compact('service', 'services'));
    }

    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($request->validated());

        return Redirect::route('admin.services.index')->with([
            'message' => trans('service.updated'),
        ]);
    }

    public function destroy(Service $service): RedirectResponse
    {
        $hasChildren = Service::query()
            ->where('parent_id', $service->id)
            ->exists();
        if($hasChildren)
            return Redirect::route('admin.services.index')->with([
                'type' => 'fail',
                'header' => __('messages.Can\'t delete'),
                'message' => __('messages.The service has children!')
            ]);
        $service->delete();

        return Redirect::route('admin.services.index')->with([
            'message' => trans('service.deleted'),
        ]);;
    }
}
