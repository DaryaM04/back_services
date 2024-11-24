<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        Language::create([
           'name' => 'en',
           'active' => true
        ]);
        Language::create([
            'name' => 'ru',
            'active' => true
        ]);
        Language::create([
            'name' => 'he',
            'active' => true
        ]);
        Language::create([
            'name' => 'ar',
            'active' => true
        ]);
    }
}
