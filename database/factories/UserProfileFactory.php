<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'photo' => fake()->imageUrl(360, 360, 'humans', true, 'cats'),
            'first_name' => fake()->name,
            'last_name' => fake()->name,
            'has_brigade' => random_int(0, 1),
            'passport_data' => ['country' => fake()->country(), 'passport_sn' => fake()->postcode],
            'options' => ['options' => fake()->colorName()],
        ];
    }
}
