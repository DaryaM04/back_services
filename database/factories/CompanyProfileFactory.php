<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyProfile>
 */
class CompanyProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'photo' => fake()->imageUrl(360, 360, 'humans', true, 'cats'),
            'name' => fake()->company,
            'tax_number' => fake()->randomNumber(),
            'options' => [],
        ];
    }
}
