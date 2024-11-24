<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    public function definition(): array
    {
        $city = fake('he')->city();
        return [
            'name' => $city,
            'name_ru' => $city . ' ru',
            'name_he' => $city . ' he',
            'name_ar' => $city . ' ar',
            'active' => [0, 1, 1, 1][array_rand([0, 1, 1, 1])], // 75% active probability
        ];
    }
}
