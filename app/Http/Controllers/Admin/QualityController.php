<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class QualityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Quality/index');
    }

    public function store(Request $request): RedirectResponse
    {
        return Redirect::route('admin.quality.index');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Quality/EditQuality');
    }

    public function edit(): Response
    {
        return Inertia::render('Admin/Quality/EditQuality');
    }

    public function update(Request $request): RedirectResponse
    {
        return Redirect::route('admin.quality.index');
    }

    public function destroy(): RedirectResponse
    {
        return Redirect::route('admin.quality.index');
    }
}
