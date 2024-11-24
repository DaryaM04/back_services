<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class ReviewTypeValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_type_id',
        'active',
        'value',
        'value_ru',
        'value_he',
        'value_ar'
    ];

    public function localized(): array
    {
        $lang = App::getLocale();
        $value = match ($lang) {
            'ru' => $this->value_ru,
            'he' => $this->value_he,
            'ar' => $this->value_ar,
            default => $this->value
        };
        return [
            'id' => $this->id,
            'value' => $value,
            'review_type_id' => $this->review_type_id,
            'active' => $this->active,
        ];
    }
}
