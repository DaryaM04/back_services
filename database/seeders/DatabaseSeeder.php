<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            LanguageSeeder::class,
            UserSeeder::class,
            CountrySeeder::class,
            ServiceSeeder::class,
            CitySeeder::class,
            ReviewTypeSeeder::class,
            ReviewTypeValueSeeder::class,
            ReviewSeeder::class
        ]);

        $this->call([
            JobSeeder::class,
            JobServiceSeeder::class,
            ContractSeeder::class,
            ResponseSeeder::class,
            OfferSeeder::class
        ]);

    }
}
