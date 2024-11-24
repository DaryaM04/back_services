<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use App\Models\Role;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Verificate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [1, 2];
        $admin_role = Role::query()->where('name', 'admin')->first();
        $user_role = Role::query()->where('name', 'user')->first();

//        User::factory()
//            ->sequence(
//                [
//                    'phone' => '79999999999',
//                    'password' => Hash::make('111'),
//                    "email" => 'mail@email.com',
//                    'status' => 'active',
//                ],
//            )
//            ->has(UserProfile::factory()->state([
//                'first_name' => 'Admin',
//                'last_name' => 'abobkin',
//            ]), 'profile')
//            ->has(Verificate::factory()->state([
//                            'status' => 1,
//                        ])
//            )
//            ->hasAttached(Role::query()->where('name', 'admin')->first())
//            ->create();

        $admin = User::create([
            "phone" => '777',
            "password" => Hash::make('111'),
            "email" => 'mail@email.com',
            "status" => 'active'
        ]);
        $admin_profile = new UserProfile([
            'user_id' => $admin->id,
            'first_name' => 'Admin',
            'last_name' => 'abobkin',
        ]);
        $admin_profile->save();
        $admin_profile->languages()->attach($languages);
        $admin_verificate = new Verificate([
            'phone' => '777',
            'status' => 1
        ]);
        $admin_verificate->save();
        $admin->verificate()->save($admin_verificate);
        $admin_profile->user()->save($admin);
        $admin->roles()->save($admin_role);

        $user = User::create([
            "phone" => '888',
            "password" => Hash::make('111'),
            "email" => 'user@email.com',
            "status" => 'active'
        ]);
        $user_profile = new UserProfile([
            'user_id' => $user->id,
            'first_name' => 'User',
            'last_name' => 'abobkin',
        ]);
        $user_profile->save();
        $user_profile->languages()->attach($languages);
        $user_verificate = new Verificate([
            'status' => 1,
            'phone' => '888'
        ]);
        $user_verificate->save();
        $user->verificate()->save($user_verificate);
        $user_profile->user()->save($user);
        $user->roles()->save($user_role);


        $company = User::create([
            "phone" => '666',
            "password" => Hash::make('111'),
            "email" => 'user@email.com',
            "status" => 'active'
        ]);
        $company_profile = new CompanyProfile([
            'user_id' => $company->id,
            'name' => 'Big Company'
        ]);
        $company_verificate = new Verificate([
            'status' => 1,
            'phone' => '666'
        ]);
        $company_verificate->save();
        $company->verificate()->save($company_verificate);
        $company_profile->save();
        $company_profile->languages()->attach($languages);
        $company_profile->user()->save($company);
        $company->roles()->save($user_role);

//        User::factory()
//        ->sequence(
//            [
//                'phone' => '777',
//                'password' => Hash::make('1'),
//                'status' => 'active'
//            ],
//        )
//        ->has(UserProfile::factory(), 'profile')
//        ->has(
//            Verificate::factory()
//                ->state(
//                    [
//                        'status' => 1,
//                    ]
//                )
//        )
//        ->hasAttached(Role::query()->where('name', 'admin')->first())
//        ->create();
//
//        User::factory()
//            ->sequence(
//                [
//                    'phone' => '79999999999',
//                    'password' => Hash::make('111'),
//                    'status' => 'active',
//                ],
//            )
//            ->has(UserProfile::factory(), 'profile')
//            ->has(CompanyProfile::factory(), 'companyProfile')
//            ->has(
//                Verificate::factory()
//                    ->state(
//                        [
//                            'status' => 1,
//                        ]
//                    )
//            )
//            ->hasAttached(Role::query()->where('name', 'admin')->first())
//            ->create();
//
//        User::factory()
//            ->sequence(
//                [
//                    'phone' => '78888888888',
//                    'password' => Hash::make('222'),
//                    'status' => 'active',
//                ]
//            )
//            ->has(UserProfile::factory(), 'profile')
//            ->has(CompanyProfile::factory(), 'companyProfile')
//            ->has(
//                Verificate::factory()
//                    ->state(
//                        [
//                            'status' => 1,
//                        ]
//                    )
//            )
//            ->hasAttached(Role::query()->where('name', 'user')->first())
//            ->create();
//
//            User::factory()
//            ->sequence(
//                [
//                    'phone' => '888',
//                    'password' => Hash::make('2'),
//                    'status' => 'active'
//                ]
//            )
//            ->has(UserProfile::factory(), 'profile')
//            ->has(
//                Verificate::factory()
//                    ->state(
//                        [
//                            'status' => 1,
//                        ]
//                    )
//            )
//            ->hasAttached(Role::query()->where('name', 'user')->first())
//            ->create();

    }
}
