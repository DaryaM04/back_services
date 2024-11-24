<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Verificate;
use App\Providers\RouteServiceProvider;
use App\Services\SmsService;
use Illuminate\Http\Request;

class ResendSmsCode extends Controller
{
    public function __invoke(Request $request, SmsService $smsService): void
    {
        $verificate = Verificate::query()->firstWhere('phone', $request->user()->phone);

//        $smsService->sendSms($request->user()->phone, $verificate->code);
    }
}
