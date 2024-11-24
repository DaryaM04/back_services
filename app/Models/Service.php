<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'name_ru',
        'name_he',
        'name_ar',
        'parent_id',
        'active',
    ];

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
            'parent_id' => $this->parent_id,
            'active' => $this->active,
            'name' => $name
        ];
    }
}
