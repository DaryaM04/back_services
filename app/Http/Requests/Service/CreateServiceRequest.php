<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class CreateServiceRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'name_ru' => ['required', 'string'],
            'name_he' => ['required', 'string'],
            'name_ar' => ['required', 'string'],
            'parent_id' => 'int|nullable',
            'active' => 'bool',
        ];
    }
}
