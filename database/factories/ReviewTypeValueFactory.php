<?php

namespace Database\Factories;

use App\Models\ReviewType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewTypeValue>
 */
class ReviewTypeValueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $value = fake()->name;
        return [
            'review_type_id' => ReviewType::query()->inRandomOrder()->first()->id,
            'active' => true,
            'value' => $value,
            'value_ru' => $value . ' ru',
            'value_he' => $value . ' he',
            'value_ar' => $value . ' ar',
        ];
    }
}
