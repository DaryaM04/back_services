<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Нужно отдать фронту список ($portfolios) всех портфолио конкретного пользователя вместе с услугами из админки
        // (таблицы: users, user_services, users)

        $portfolios = Portfolio::query()->get()->toArray(); // TODO: доделать


        return Inertia::render('User/Portfolio/index', compact('portfolios'));// в метод render передать данные
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Нужно отдать фронту список услуг ($services) из админки
        // (таблица: services)

        return Inertia::render('User/Portfolio/EditPortfolio'); // в метод render передать данные ($services)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Валидация нужных полей (смотреть в таблице portfolios) и запись в БД

        return Redirect::route('user.portfolio.index');
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
        // Нужно отдать фронту список, отобранных по языку услуг ($services) из админки и портфолио пользователя, которое мы обновляем
        // (таблица: services, portfolios)

        return Inertia::render('User/Portfolio/EditPortfolio'); // в метод render передать данные ($services, $portfolio)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserService $service)
    {
        // Валидация нужных полей (смотреть в таблице portfolios) и запись в БД

        return Redirect::route('user.portfolio.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Удаляем запись в бд
    }
}
