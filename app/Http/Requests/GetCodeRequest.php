<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetCodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => 'required',
        ];
    }
}
