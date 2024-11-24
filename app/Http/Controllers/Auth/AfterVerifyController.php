<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use App\Models\UserProfile;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AfterVerifyController extends Controller
{
    public function __invoke(Request $request)
    {
        // validate separately
        $profileType = $request->validate([
            'profileType' => ['required', 'string']
        ])['profileType'];
        // collect rules
        $serviceRules = ['services' => ['required', 'array']];
        $languagesRules = ['languages' => ['required', 'array']];
        $profileRules = match ($profileType) {
            'user' => [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'has_brigade' => ['required', 'bool'],
                'city_id' => ['required', 'numeric']
            ],
            'company' => [
                'name' => ['required', 'string'],
                'city_id' => ['required', 'numeric']
            ],
            default => throw new \Exception('profileType is not recognized'),
        };

        // validate them all together
        $request->validate([
            ...$serviceRules,
            ...$profileRules,
            ...$languagesRules
        ]);

        $profileData = $request->validate($profileRules);
        $services = $request->validate($serviceRules)['services'];
        $languages = $request->validate($languagesRules)['languages'];

        $user = auth()->user();
        if (!is_null($request->file('image'))) {
            $request->file('image')->store('public/img');
            $photo = '/storage/img/'.$request->file('image')->hashName();
        } else {
            $photo = '';
        }
        $profile = match ($profileType) {
            'user' => new UserProfile([
                'user_id' => $user->id,
                ...$profileData,
                'photo' => $photo
            ]),
            'company' => new CompanyProfile([
                'user_id' => $user->id,
                ...$profileData,
                'photo' => $photo
            ]),
            default => throw new \Exception('profileType is not recognized'),
        };
        $profile->save();
        $profile->languages()->attach($languages);
        $profile->user()->save($user);
        $profile->services()->attach($services);

        return redirect(RouteServiceProvider::getHomeLink());
    }
}
