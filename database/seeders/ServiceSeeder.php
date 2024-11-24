<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::factory()->count(20)->create();
        for($i=3; $i < 19; $i++) {
            $id = random_int(1, $i - 1);
//            $id = Service::query()->inRandomOrder()->first()->id;
            Service::query()->where('id', $i)->update(['parent_id'=> $id]);
        }
    }
}
