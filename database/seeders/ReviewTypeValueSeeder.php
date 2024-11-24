<?php

namespace Database\Seeders;

use App\Models\ReviewTypeValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewTypeValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReviewTypeValue::factory()->count(20)->create();
    }
}
