<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserService;
use App\Models\Service;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class UserServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Нужно отдать фронту список ($userServices) услуг конкретного пользователя вместе с услугами из админки
        // (таблицы: users, user_services, services)

        // получаем данные 
        $userServices = UserService::with(['user', 'service'])->get();

        // передаем данные на frontend
        return Inertia::render('User/Services', compact('userServices'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Нужно отдать фронту список, отобранных по языку услуг ($services) из админки
        // (таблица: services)

        $services = Service::all();
        return Inertia::render('User/EditService', compact('services')); // в метод render передать данные ($services)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Валидация нужных полей (смотреть в таблице user_services) и запись в БД
        $validatedData = $request->validate([
            'user_id' => ['numeric'],
            'service_id' => ['required', 'numeric'],
            'is_by_agreement' => ['boolean'],
            'is_hourly_type' => ['boolean'],
            'is_work_type' => ['boolean'],
            'hourly_payment' => ['required_if:is_hourly_type,true', 'nullable', 'numeric'],
            'work_payment' => ['required_if:is_work_type,true', 'nullable', 'numeric'],
            'is_active' => ['boolean'],
        ]);

        $validatedData['user_id'] = Auth::id();

        UserService::query()->create($validatedData);
        
        return Redirect::route('user.services.index')->with([
            'message' => trans('user.service.store')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // не трогать!
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Нужно отдать фронту список, отобранных по языку услуг ($services) из админки и услугу пользователя, которую мы обновляем
        // (таблица: services, user_services)

        $user_id = Auth::id();
        $services = Service::all();
        $userService = UserService::query()->findOrFail($id);

        // if (!$userService || $user_id != $userService->user_id) {
        //     abort(404);
        // }

        return Inertia::render('User/EditService', compact('services', 'userService')); // в метод render передать данные ($services, $userServices)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = UserService::findOrFail($id);
        // Валидация нужных полей (смотреть в таблице user_services) и запись в БД
        $validatedData = $request->validate([
            'service_id' => ['required', 'numeric'],
            'is_by_agreement' => ['boolean'],
            'is_hourly_type' => ['boolean'],
            'is_work_type' => ['boolean'],
            'hourly_payment' => ['required_if:is_hourly_type,true', 'nullable', 'numeric'],
            'work_payment' => ['required_if:is_work_type,true', 'nullable', 'numeric'],
            'is_active' => ['boolean'],
        ]);

        //dd($validatedData, $service->toArray());
        //dd($service);
        //dd(userService::all());
        //dd($validatedData);
        //обновляем данные сервиса
        $service->update($validatedData);
        //dd($validatedData);
        return Redirect::route('user.services.index')->with([
            'message' => trans('service.updated'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Удаляем запись в бд
        $userService = UserService::query()->find($id);

        // if (!$userService || Auth::id() != $userService->user_id) {
        //     abort(404);
        // }

        UserService::destroy($id);

        return Redirect::route('user.services.index')->with([
            'message' => trans('service.deleted'),
        ]);
    }
}
