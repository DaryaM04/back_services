<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Facades\Hash;

class CreateUserRequest extends BaseRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'password' => Hash::make($this->input('password')),
            // backend must implement country_code detection by its own way
//            'country_code' => substr($this->input('phone'), 0, 3)
//            'status' => $this->input('status') ? 'active' : 'block',
//            'consent' => 1,
        ]);
    }

    public function rules(): array
    {
        return [
            //            'consent' => 'required',
            'phone' => 'required',
            'status' => 'required',
            'email' => 'required',
            'password' => 'required',
//            'country_code' => 'required',
        ];
    }
}
