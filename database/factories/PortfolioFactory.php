<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portfolio>
 */
class PortfolioFactory extends Factory
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
            'description' => fake()->text,
            'price' => random_int(1000, 10000),
            'photos' => fake()->filePath(),
            'active' => random_int(0, 1),
            'options' => json_encode(['color' => fake()->colorName(), 'width' => random_int(1, 1000)]),
            'service_id' => Service::factory(),
            'service_name' => fake()->firstName,
        ];
    }
}
