<?php

namespace Database\Seeders;

use App\Models\ReviewType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReviewType::factory()->count(20)->create();
    }
}
