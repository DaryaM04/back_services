<?php

namespace App\Providers;

use App\Services\VerificationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $passwordMinLength = $this->app->isLocal() ? 1 : 6;
        Password::defaults(function () use ($passwordMinLength) {
            $rule = Password::min($passwordMinLength);

            return $rule;
        });

        // Locale
        $locale = Request::cookie('lang', false);
        if (! $locale) {
            $locale = Auth::user()?->local ?? 'en';
        }
        App::setLocale($locale);
        Carbon::setLocale($locale);
    }
}
