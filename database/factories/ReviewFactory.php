<?php

namespace Database\Factories;

use App\Models\CompanyProfile;
use App\Models\Review;
use App\Models\ReviewType;
use App\Models\ReviewTypeValue;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ReviewFactory extends Factory
{
    public function definition(): array
    {
        $user = User::query()->inRandomOrder()->first();
//        $profile = $user->profile;
//        $review = new Review([]);
//        $review->reviewable()->save();
//        $profile->reviews()->save();
        return [
            'name' => fake()->name,
            'active' => true,
            'review_type_id' => ReviewType::query()->inRandomOrder()->first()->id,
            'review_type_value_id' => ReviewTypeValue::query()->inRandomOrder()->first()->id,
            'comment' => fake()->text,
            "reviewable_type" => $user->profile_type,
            "reviewable_id" => $user->profile_id,
        ];
    }
}
