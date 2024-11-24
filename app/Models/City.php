<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class City extends Model
{
    use HasFactory;

    public $table = 'cities';

    protected $fillable = [
        'name',
        'name_ru',
        'name_he',
        'name_ar',
        'active',
    ];
    public static function getLocalizedCities() {
        return City::query()
            ->where('active', true)->get()
            ->map(fn (City $city) => $city->localized());
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
            'name' => $name
        ];
    }
}
