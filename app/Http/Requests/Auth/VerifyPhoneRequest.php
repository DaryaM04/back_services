<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VerifyPhoneRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $this->merge(['code' => $this->input('code_confirmation')]);
    }

    public function rules(): array
    {
        return [
            'code' => [
                'required',
                Rule::exists('verificate')
                    ->where('phone', $this->user()->phone),
            ],
        ];
    }

    public function messages() {
        return [
            'code.exists' => trans('auth.incorrect_code'),
        ];
    }
}
