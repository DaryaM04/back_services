<?php

namespace App\Http\Controllers\User;

use App\Enums\VerificationType;
use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use App\Models\UserProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $is_verified = $user?->profile->is_verified;
        return Inertia::render('User/Profile/index', compact('is_verified'));
    }

    public function passport(Request $request): Response
    {
        $user = $request->user();
        switch ($user->profile_type) {
            case UserProfile::class:
                $passport = $user->profile->passport_data;
                return Inertia::render('User/Profile/Passport/UserPassport', compact('passport'));
            case CompanyProfile::class:
                $options = $user->profile->options;
                $passport = [
                    'company_info' => $user->profile->tax_number,
                    // null safe array access
                    'founder_id' => $options ? $options['founder_id'] : null,
                    'founder_name' => $options ? $options['founder_name'] : null,
                ];
                return Inertia::render('User/Profile/Passport/CompanyPassport', compact('passport'));
        }
    }

    public function storePassport(Request $request): RedirectResponse
    {
        $user = $request->user();
        if($user?->profile->is_verified === VerificationType::Verified->value)
            return Redirect::route('user.passport')->with([
                'type' => 'fail',
                'message' => 'Passport change after confirmation is not allowed'
            ]);
        return match ($user->profile_type) {
            UserProfile::class => $this->storeUserPassport($request),
            CompanyProfile::class => $this->storeCompanyPassport($request)
        };
    }

    protected function storeUserPassport(Request $request): RedirectResponse
    {
        $user = $request->user();
        $passport_data = $user->profile->passport_data ?? [
            'image' => null,
            'video' => null
        ];

        $files = $request->files;

        // если пользователь еще не добавлял фото, то валидируем его
        // если пользователь приложил новое фото, то валидируем его
        // иначе не требуем фото, а используем старый путь
        $image_rule = [];
        if (is_null($passport_data['image']) || $files->has('image'))
            $image_rule = [
                'image' => ['required', 'file', File::image()->max(10 * 1024)], // 10 mb
            ];
        $video_rule = [];
        if (is_null($passport_data['video']) || $files->has('video'))
            $video_rule = [
                'video' => ['required', 'file', File::types(['mp4', 'webm', 'avi', 'mov'])->max(50 * 1024)] // 50 mb
            ];
        $files = $request->validate([
            ...$image_rule,
            ...$video_rule
        ]);

        $image_path = $passport_data['image'];
        if (array_key_exists('image', $files)) {
            $files['image']->store('passport/files');
            $image_path = '/passport/files/' . $files['image']->hashName();
        }

        $video_path = $passport_data['video'];
        if (array_key_exists('video', $files)) {
            $files['video']->store('passport/files');
            $video_path = '/passport/files/' . $files['video']->hashName();
        }

        $user->profile()->update([
            'passport_data' => [
                'image' => $image_path,
                'video' => $video_path
            ]
        ]);

        return Redirect::route('user.profile')->with([
            'message' => __('Successfully updated passport data')
        ]);
    }

    protected function storeCompanyPassport(Request $request): RedirectResponse
    {
        $user = $request->user();
        $passport_data = $request->validate([
            'company_info' => ['required', 'string'],
            'founder_id' => ['required', 'string'],
            'founder_name' => ['required', 'string']
        ]);
        $user->profile()->update([
            'tax_number' => $passport_data['company_info'],
            'options' => [
                'founder_id' => $passport_data['founder_id'],
                'founder_name' => $passport_data['founder_name']
            ]
        ]);

        return Redirect::route('user.profile')->with([
            'message' => __('Successfully updated passport data')
        ]);
    }
}
