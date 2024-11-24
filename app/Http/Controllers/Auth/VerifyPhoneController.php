<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyPhoneRequest;
use App\Models\Verificate;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;

class VerifyPhoneController extends Controller
{
    public function __invoke(VerifyPhoneRequest $request): RedirectResponse
    {
        Verificate::query()
            ->where('phone', $request->user()->phone)
            ->where('code', $request->validated('code'))
            ->update([
                'status' => true,
            ]);

        return redirect(RouteServiceProvider::getHomeLink());
    }
}
