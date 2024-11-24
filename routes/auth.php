<?php

use App\Http\Controllers\Auth\AfterVerifyController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RecoveryController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\ResendSmsCode;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\VerifyPhoneController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [RegisteredUserController::class, 'index'])
    ->name('register');
Route::post('/sendCode', [RegisteredUserController::class, 'sendCode'])
    ->name('register.sendCode');

Route::get('/register/verification', [RegisteredUserController::class, 'verification'])
    ->name('register.verification');
Route::post('/register/verifyCode', [RegisteredUserController::class, 'verifyCode'])
    ->name('register.verifyCode');

Route::get('/registration', [RegisteredUserController::class, 'registration'])
    ->name('registration');
Route::post('/register', [RegisteredUserController::class, 'register'])
    ->name('register1');


Route::get('recovery', [RecoveryController::class, 'index'])->name('recovery.index');
Route::get('recovery/verified', [RecoveryController::class, 'verifiedPage'])->name('recovery.verified');
Route::get('recovery/verifyCode', [RecoveryController::class, 'verifyCodePage'])->name('recovery.verifyCode');

Route::post('recovery/sendSMS', [RecoveryController::class, 'sendSMS'])->name('recovery.sendSMS');
Route::post('recovery/verify', [RecoveryController::class, 'verifyCode'])->name('recovery.verify');
Route::post('recovery/save', [RecoveryController::class, 'savePassword'])->name('recovery.save');
Route::post('recovery/changePhone', [RecoveryController::class, 'changePhone'])->name('recovery.changePhone');

Route::get('login', [AuthenticatedSessionController::class, 'create'])
    ->name('login');

Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('guest')->group(function () {

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    Route::get('reset-password', [ResetPasswordController::class, 'create'])
        ->name('reset.password');

    Route::post('reset-password', [ResetPasswordController::class, 'reset'])
        ->name('reset.password.complete');

    Route::post('reset-password-code', [ResetPasswordController::class, 'getCode'])
        ->name('reset.password.code');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::post('phone/verification', VerifyPhoneController::class)->name('phone.verify');
    Route::post('resend-code', ResendSmsCode::class)->name('resend.code');
    Route::post('after/verification', AfterVerifyController::class)->name('after.verify');
});
