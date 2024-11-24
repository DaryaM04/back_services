<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;

class ReviewType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_ru',
        'name_he',
        'name_ar',
        'active',
        'profile_type',
        'type',
    ];

    protected $casts = [
        'profile_type' => 'array',
    ];

    public function values(): HasMany
    {
        return $this->hasMany(ReviewTypeValue::class);
    }

    public function localized(): array
    {
        $lang = App::getLocale();
        $name = match ($lang) {
            'ru' => $this->name_ru,
            'he' => $this->name_he,
            'ar' => $this->name_ar,
            default => $this->name
        };
        return [
            'id' => $this->id,
            'active' => $this->active,
            'profile_type' => $this->profile_type,
            'type' => $this->type,
            'name' => $name
        ];
    }
}
