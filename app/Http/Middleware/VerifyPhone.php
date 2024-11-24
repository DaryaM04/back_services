<?php

namespace App\Http\Middleware;

use App\Models\Verificate;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VerifyPhone
{
    public function handle(Request $request, Closure $next)
    {
//        if (! $request->user()->verificate->status) {
//            $phone = $request->user()->phone;
//            $code = app()->isLocal() ?
//                Verificate::query()->where('phone', $phone)->first()->code
//                : null;
//            return Inertia::render('Public/Auth/VerifyPhone', [
//                'user_phone' => $phone,
//                'code' => $code
//            ]);
//        }

        return $next($request);
    }
}
