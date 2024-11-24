<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Validator;

class RegisteredUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation(): void
    {
        $this->mergeIfMissing([
            'status' => 'active',
        ]);
    }
    public function rules(): array
    {
        return [
            'phone' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function after(): array
    {
        $this->merge([
            'password' => Hash::make($this->input('password')),
        ]);
        return [
            function (Validator $validator) {

                $user = User::query()->where('phone', $this->input('phone'))->first();

                if (! is_null($user) && $user->verificate->status === true) {
                    $validator->errors()->add(
                        'phone',
                        trans('auth.already_registred')
                    );
                }
            },
        ];
    }
}
