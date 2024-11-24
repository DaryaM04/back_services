<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Facades\Hash;

class UpdateUserRequest extends BaseRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'password' => Hash::make($this->input('password')),
            'status' => $this->input('status') ? 'blocked' : 'unblocked',
        ]);
    }

    public function rules(): array
    {
        return [
            'consent' => '',
            'phone' => '',
            'status' => '',
            'email' => '',
            'password' => '',
            'country_code' => '',
        ];
    }
}
