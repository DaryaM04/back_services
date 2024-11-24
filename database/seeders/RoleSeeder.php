<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::factory()->count(2)
            ->sequence(
                [
                    'name' => 'admin',
                ],
                [
                    'name' => 'user',
                ]
            )->create();
    }
}
