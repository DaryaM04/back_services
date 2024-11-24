<?php

namespace App\Http\Requests\UserProfiles;

use App\Http\Requests\BaseRequest;

class UpdateUserProfileRequest extends BaseRequest
{
    public function prepareForValidation(): void
    {
        if (! is_null($this->file('img'))) {
            $photoPath = $this->file('img')->store('public/img');

            $this->merge([
                'photo' => 'img/'.$this->file('img')->hashName(),
            ]);
        }

        $this->merge([
            'passport_data' => json_encode([
                'country' => $this->input('country'),
                'passport_sn' => $this->input('passport_sn'),
            ]),
            'options' => json_encode(['options' => $this->input('options')]),
        ]);
    }

    public function rules(): array
    {
        return [
            'photo' => '',
            'full_name' => '',
            'has_brigade' => '',
            'passport_data' => '',
            'options' => '',
        ];
    }
}
