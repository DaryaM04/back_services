<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $service = fake()->name;
        return [
            'name' => $service,
            'name_ru' => $service . ' ru',
            'name_he' => $service . ' he',
            'name_ar' => $service . ' ar',
            'parent_id' => null,
            'active' => random_int(0, 1),
        ];
    }
}
