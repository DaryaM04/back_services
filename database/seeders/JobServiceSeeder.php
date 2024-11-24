<?php

namespace Database\Seeders;


use App\Models\JobService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobService::factory()->count(10)->create();
    }
}
