<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RestPasswordRequest;
use App\Http\Requests\GetCodeRequest;
use App\Models\User;
use App\Services\VerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ResetPasswordController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Public/Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    public function reset(RestPasswordRequest $request): RedirectResponse
    {
        User::query()
            ->where('phone', $request->input('phone'))
            ->update([
                'password' => Hash::make($request->validated('password')),
            ]);

        return redirect()->route('login');
    }

    public function getCode(GetCodeRequest $request, VerificationService $verificationService): void
    {
        $verificationService->sms($request->validated('phone'));
    }
}
