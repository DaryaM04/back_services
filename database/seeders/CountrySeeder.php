<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::factory()
            ->count(3)
            ->sequence(
                ['flag' => '&#127470;&#127473;', 'code' => '+972'],
                ['flag' => '&#127479;&#127482;', 'code' => '+7'],
                ['flag' => '&#127482;&#127480;', 'code' => '+1'],
            )
            ->create();
    }
}
