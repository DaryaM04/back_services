<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Verificate;
use App\Providers\RouteServiceProvider;
use App\Services\VerificationService;
use DateTime;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class RecoveryController extends Controller
{
    public function __construct(protected VerificationService $verificationService)
    {}

    public function index(Request $request): Response
    {
        $request->session()->forget(['phone', 'code']);
        return Inertia::render('Public/Auth/Recovery/Recovery');
    }

    /**
     * @throws ValidationException
     */
    public function sendSMS(Request $request): RedirectResponse
    {
        $phone = $request->validate([
            'phone' => ['required', 'string', 'max:255'],
        ])['phone'];
        $user = User::query()->where('phone', '=', $phone)->first();
        if (is_null($user)) {
            throw ValidationException::withMessages([
                'phone' => __('Phone not found')
            ]);
        }

        // generate random code
        $code = random_int(1000, 9999);
        $this->verificationService->sms($request->phone, $code);

        $request->session()->put('phone', $phone);
        $request->session()->put('code', $code);
        return Redirect::route('recovery.verifyCode');
    }

    public function verifyCodePage(Request $request): Response
    {
        $phone = $request->session()->get('phone');
        $code = app()->isLocal() ? $request->session()->get('code') : null;
        return Inertia::render('Public/Auth/Recovery/VerifyCode',
            compact('phone', 'code'));
    }

    public function verifyCode(Request $request): RedirectResponse
    {
        $phone = $request->session()->get('phone');
        $code = $request->validate([
            'code' => [
                'required', Rule::exists('verificate')->where('phone', $phone)
            ]
        ])['code'];

        // validate code lifetime
        $code_updated_at = Verificate::query()->where([
            'phone' => $phone,
            'code' => $code
        ])->first()->updated_at;
        $now = new DateTime();
        $code_lifetime = abs($now->getTimestamp() - $code_updated_at->getTimestamp());
        $code_ttl = config('auth.verification_code_ttl');
        if($code_lifetime > $code_ttl) {
            // redirect if code is outdated
            return Redirect::route('recovery.index')->with([
                'type' => 'fail',
                'header' => __('messages.The verification code is outdated'),
                'message' => __('messages.Enter the phone number again')
            ]);
        }

        Verificate::query()
            ->where('phone', $phone)
            ->where('code', $code)
            ->update(['status' => true]);
        return Redirect::route('recovery.verified');
    }

    public function verifiedPage(): Response
    {
        return Inertia::render('Public/Auth/Recovery/Verified');
    }

    public function savePassword(Request $request): RedirectResponse
    {
        $phone = $request->session()->get('phone');

        $userdata = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $userdata['password'] = Hash::make($userdata['password']);
        User::query()
            ->where('phone', '=', $phone)
            ->update($userdata);

        $request->session()->forget(['phone', 'code']);
        return Redirect::route('login');
    }

    public function changePhone(Request $request): RedirectResponse
    {
        $request->session()->forget(['phone', 'code']);
        return Redirect::route('recovery.index');
    }
}
