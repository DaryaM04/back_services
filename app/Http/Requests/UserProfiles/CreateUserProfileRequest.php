<?php

namespace App\Http\Requests\UserProfiles;

use App\Http\Requests\BaseRequest;

class CreateUserProfileRequest extends BaseRequest
{
    public function prepareForValidation(): void
    {
        $photoPath = $this->file('img')?->store('public/img');

        $this->merge([
            'photo' => 'img/'.$this->file('img')?->hashName(),
            'passport_data' => [
                'country' => $this->input('country'),
                'passport_sn' => $this->input('passport_sn'),
            ],
            'options' => ['options' => $this->input('options')],
        ]);
    }

    public function rules(): array
    {
        return [
            //            'photo' => 'required',
            'full_name' => 'required',
            'has_brigade' => '',
            'passport_data' => '',
            'options' => '',
        ];
    }
}
