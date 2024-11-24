<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Плитка',
            'Общестрой',
            'Фундамент',
            'Отделка'
        ];

        return [
            'name' => fake()->name,
            'category' => $categories[random_int(0,3)],
            'status' => random_int(0, 1),
            'type' => random_int(0, 2),
            'address' => fake()->address(),
            'description' => fake()->text(),
            'tel' => fake()->phoneNumber(),
            'user_id' => User::all('id')->random(),
            'date_to' => fake()->dateTimeThisYear()
        ];
    }
}
