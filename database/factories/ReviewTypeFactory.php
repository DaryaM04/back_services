<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewType>
 */
class ReviewTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name;
        return [
            'name' => $name,
            'name_ru' => $name . ' ru',
            'name_he' => $name . ' he',
            'name_ar' => $name . ' ar',
            'active' => true,
            'profile_type' => Arr::random([['user'], ['company'], ['user', 'company']]),
            'type' => Arr::random(['common', 'service']),
        ];
    }
}
