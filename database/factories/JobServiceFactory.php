<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobService>
 */
class JobServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_id' => Job::all('id')->random(),
            'service_id' => Service::all('id')->random(),
            'price' => fake()->randomDigitNotZero(),
        ];
    }
}
