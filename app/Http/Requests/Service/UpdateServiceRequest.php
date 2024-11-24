<?php

namespace App\Http\Requests\Service;

use App\Http\Requests\BaseRequest;

class UpdateServiceRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name' => 'string|required',
            'name_ru' => 'string|required',
            'name_he' => 'string|required',
            'name_ar' => 'string|required',
            'parent_id' => 'int|nullable',
            'active' => 'bool',
        ];
    }
}
