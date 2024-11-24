<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUserRequest;
use App\Models\City;
use App\Models\CompanyProfile;
use App\Models\Country;
use App\Models\Service;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Verificate;
use App\Providers\RouteServiceProvider;
use App\Services\SmsService;
use App\Services\VerificationService;
use DateTime;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function __construct(private readonly SmsService $smsService,
                                protected VerificationService $verificationService)
    {
    }

    /**
     * Display the registration view.
     */
    public function index(Request $request): Response
    {
        $request->session()->forget(['phone', 'code']);
        return Inertia::render('Public/Auth/Register/Register');
    }

    public function sendCode(Request $request) : RedirectResponse
    {
        $phone = $request->validate([
            'phone' => ['required', 'string', 'max:255', 'unique:users,phone'],
        ])['phone'];

        $code = random_int(1000, 9999);
        $this->verificationService->sms($request->phone, $code);

        $request->session()->put('phone', $phone);
        $request->session()->put('code', $code);
        return Redirect::route('register.verification');
    }
    protected function isCodeValid(DateTime $sent_at) {
        $now = new DateTime();
        $code_lifetime = abs($now->getTimestamp() - $sent_at->getTimestamp());
        $code_ttl = config('auth.verification_code_ttl');
        return $code_lifetime < $code_ttl;
    }
    public function verification(Request $request) : Response|RedirectResponse
    {
        if(!$request->session()->exists(['phone', 'code']))
            return Redirect::route('register');
        $phone = $request->session()->get('phone');
        $code = app()->isLocal() ? $request->session()->get('code') : null;
        $code_updated_at = Verificate::query()->where([
            'phone' => $phone,
        ])->first()->updated_at;
        if(!$this->isCodeValid($code_updated_at)) {
            // redirect if code is outdated
            return Redirect::route('register')->with([
                'type' => 'fail',
                'header' => __('messages.The verification code is outdated'),
                'message' => __('messages.Enter the phone number again')
            ]);
        }
        return Inertia::render('Public/Auth/Register/Verification', compact('phone', 'code'));
    }

    public function verifyCode(Request $request): RedirectResponse
    {
        $phone = $request->session()->get('phone');
        $code = $request->validate([
            'code' => [
                'required', Rule::exists('verificate')->where('phone', $phone)
            ]
        ])['code'];

        $code_updated_at = Verificate::query()->where([
            'phone' => $phone,
        ])->first()->updated_at;
        if(!$this->isCodeValid($code_updated_at)) {
            // redirect if code is outdated
            return Redirect::route('register')->with([
                'type' => 'fail',
                'header' => __('messages.The verification code is outdated'),
                'message' => __('messages.Enter the phone number again')
            ]);
        }
        $request->session()->put('verified_at', new DateTime());
        Verificate::query()
            ->where('phone', $phone)
            ->where('code', $code)
            ->update(['status' => true]);
        return Redirect::route('registration');
    }

    protected function isVerificationValid(DateTime $verified_at) : bool {
        // ~10 minutes for registration, ~2 minutes for local
        $verificated_phone_ttl = config('auth.verificated_phone_ttl');
        $verification_lifetime = abs($verified_at->getTimestamp() - (new DateTime())->getTimestamp());
        return $verification_lifetime < $verificated_phone_ttl;
    }
    public function registration(Request $request) : Response | RedirectResponse
    {
        if(!$request->session()->exists(['phone', 'verified_at']))
            return Redirect::route('register');
        $verified_at = $request->session()->get('verified_at');
        $phone = $request->session()->get('phone');
        if(!$this->isVerificationValid($verified_at))
            return Redirect::route('register')->with([
                'type' => 'fail',
                'message' => __('Phone verification is stale')
            ]);

        $services = Service::query()
            ->where('active', true)->get()
            ->map(fn($service) => $service->localized());

        $cities = City::getLocalizedCities();
        return Inertia::render('Public/Auth/Register/Registration', compact('phone', 'cities', 'services'));
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     * @throws \Exception
     */
    public function register(Request $request): RedirectResponse
    {
        if(!$request->session()->exists(['phone', 'verified_at']))
            return Redirect::route('register');
        $verified_at = $request->session()->get('verified_at');
        $phone = $request->session()->get('phone');
        if(!$this->isVerificationValid($verified_at))
            return Redirect::route('register')->with([
                'type' => 'fail',
                'message' => __('Phone verification is stale')
            ]);
        $profileType = $request->validate([
            'profileType' => ['required', 'string']
        ])['profileType'];
        $userRules = [
            'email' => ['sometimes'],
            'password' => ['sometimes', 'confirmed', Rules\Password::defaults()]
        ];
        $profileRules = match ($profileType) {
            'user' => [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'has_brigade' => ['required', 'bool'],
                'city_id' => ['required', 'numeric'],
            ],
            'company' => [
                'name' => ['required', 'string'],
                'city_id' => ['required', 'numeric'],
            ],
            default => throw new \Exception('profileType is not recognized'),
        };
        $serviceRules = ['services' => ['required', 'array']];

        $request->validate([
            ...$userRules,
            ...$profileRules,
            ...$serviceRules,
        ]);

        $userData = $request->validate($userRules);
        $userData['phone'] = $phone; // already validated in previous step
        $userData['password'] = Hash::make($userData['password']);
        $profileData = $request->validate($profileRules);
        $services = $request->validate($serviceRules)['services'];

        $photo = $request->file('photo');
        if (!is_null($photo)) {
            $photo->store('public/img');
            $photoPath = '/storage/img/' . $photo->hashName();
        } else {
            $photoPath = $request->photo ?? '';
        }
        DB::beginTransaction();
        try {
            $user = User::create($userData);
            $user->assignRole('user');

            $profile = match ($profileType) {
                'user' => new UserProfile([
                    'user_id' => $user->id,
                    ...$profileData,
                    'photo' => $photoPath
                ]),
                'company' => new CompanyProfile([
                    'user_id' => $user->id,
                    ...$profileData,
                    'photo' => $photoPath
                ]),
                default => throw new \Exception('profileType is not recognized')
            };
            $profile->save();
            $profile->user()->save($user);
            $profile->services()->attach($services);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage());
        }
        Auth::login($user);
        event(new Registered($user));

        $request->session()->forget(['phone', 'code', 'verified_at']);
        return Redirect::intended(RouteServiceProvider::getHomeLink());
    }
}
