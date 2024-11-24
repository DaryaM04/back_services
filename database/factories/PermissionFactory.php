<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => array_rand(['admin' => 'admin', 'user' => 'user']),
            'guard_name' => array_rand(['administrators' => 'administrators', 'users' => 'users']),
        ];
    }
}
