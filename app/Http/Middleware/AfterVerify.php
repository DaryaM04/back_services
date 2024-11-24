<?php

namespace App\Http\Middleware;

use App\Models\City;
use App\Models\Country;
use App\Models\Language;
use App\Models\Service;
use App\Models\User;
use App\Models\UserProfile;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AfterVerify
{
    public function handle(Request $request, Closure $next)
    {
//        $user = $request->user();
//        $profile = $user->profile;
//        if (is_null($profile)) {
//            $services = Service::query()
//                ->where('active', true)->get()
//                ->map(fn ($service) => $service->localized());
//
//            $cities = City::getLocalizedCities();
//            $languages = Language::query()
//                ->where('active', true)->get();
//
//            return Inertia::render('Public/Auth/AfterVerify', compact('languages', 'services', 'cities'));
//        }

        return $next($request);
    }
}
