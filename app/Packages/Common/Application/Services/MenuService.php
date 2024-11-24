<?php

namespace App\Packages\Common\Application\Services;

use Illuminate\Support\Facades\Auth;

class MenuService
{

    private static function getItems():array
    {
        return [
            // user items
            'admin'     => ['name' => __('menu.admin'), 'href' => route('admin.dashboard.index')],
            'profile'   => ['name' => __('menu.profile'), 'href' => route('user.profile')],
//            'invite'    => ['name' => __('menu.invite'), 'href' => route('invite-user')],
            'logout'    => ['name' => __('menu.logout'), 'href' => route('logout')],



            // admins items
            'dashboard' => ['name' => __('menu.dashboard'), 'href' => route('admin.dashboard.index'), 'icon' => 'DashboardIcon'],
//             'tables'   => ['name' => __('menu.tables'), 'href' => route('admin.dashboard')], // users main screen
            'services' => ['name' => __('menu.services'), 'href' => route('admin.services.index'), 'icon' => 'ServiceIcon'], // users main screen
            'cities'   => ['name' => __('menu.cities'), 'href' => route('admin.cities.index'), 'icon' => 'CityIcon'],
            'users'    => ['name' => __('menu.users'), 'href' => route('admin.users.index'), 'icon' => 'UsersIcon'],
//             'quality'    => ['name' => __('menu.rating'), 'href' => route('admin.quality.index'), 'icon' => 'RatingIcon'],
            'approve'    => ['name' => __('menu.approve'), 'href' => route('admin.passport.index'), 'icon' => 'ApproveIcon'],
            'review'    => ['name' => __('menu.review'), 'href' => route('admin.review.index'), 'icon' => 'ReviewIcon'],
            'review-type'    => ['name' => __('menu.review-type'), 'href' => route('admin.review-type.index'), 'icon' => 'ReviewIcon'],

            // User's data
            'jobs'       => ['name' => __('menu.jobs'), 'href' => route('admin.job.index'), 'icon' => 'ReviewIcon'],
            'contracts'  => ['name' => __('menu.contracts'), 'href' => route('admin.contract.index'), 'icon' => 'ReviewIcon'],
            'offers'     => ['name' => __('menu.offers'), 'href' => route('admin.offer.index'), 'icon' => 'ReviewIcon'],
            'responses'  => ['name' => __('menu.responses'), 'href' => route('admin.response.index'), 'icon' => 'ReviewIcon'],

                        // user sideboard items
            // TODO: change routes
            'employee' => ['name' => __('menu.employee'), 'href' => route('user.dashboard'), 'icon' => 'EmployeeIcon'],
            'employer' => ['name' => __('menu.employer'), 'href' => route('user.dashboard'), 'icon' => 'EmployerIcon'],
            'blacklist' => ['name' => __('menu.blacklist'), 'href' => route('user.dashboard'), 'icon' => 'BlacklistIcon'],
            'userProfile' => ['name' => __('menu.userProfile'), 'href' => route('user.profile'), 'icon' => 'UserProfileIcon'],
            'rates' => ['name' => __('menu.rates'), 'href' => route('user.dashboard'), 'icon' => 'RatesIcon'],
            'myContracts' => ['name' => __('menu.myContracts'), 'href' => route('user.dashboard'), 'icon' => 'MyContractsIcon'],
            'projectSearch' => ['name' => __('menu.projectSearch'), 'href' => route('user.projectsearch'), 'icon' => 'ProjectSearchIcon'],
            'servicesAndWorkingConditions' => ['name' => __('menu.servicesAndWorkingConditions'), 'href' => route('user.services'), 'icon' => 'ServicesAndWorkingConditionsIcon'],
            'portfolio' => ['name' => __('menu.portfolio'), 'href' => route('user.portfolio.index'), 'icon' => 'PortfolioIcon'],
            'employeeSearch' => ['name' => __('menu.employeeSearch'), 'href' => route('user.dashboard'), 'icon' => 'EmployeeSearchIcon'],
            'myProjects' => ['name' => __('menu.myProjects'), 'href' => route('user.dashboard'), 'icon' => 'MyProjectsIcon'],
        ];
    }

    public static function buildTopMenu() {
        $user = Auth::user();
        if (!$user) return [];

        $items = self::getItems();

        $res = collect()->add($items['dashboard']);
//            ->add($user->can('package', 'LC') ? $items['LC'] : null);

        $res = $res
             ->add($user->hasRole('admin') ? $items['admin'] : null)
            ->filter()
            ->values()
            ->toArray();

        return $res;
    }

    public static function buildUserMenu() {
        $user = Auth::user();
        if (!$user) return [];

        $items = self::getItems();

        $res = collect()
//            ->add($items['profile'])
            ->add($user->hasRole('admin') ? $items['admin'] : null)
//            ->add($user->can('admin') ? $items['admin'] : null)
//            ->add($user->can('admin') ? $items['invite'] : null)
            ->add($items['logout'])
            ->filter()
            ->values()
            ->toArray();

        return $res;
    }

    public static function buildLeftMenu() {
        $user = Auth::user();
        if (!$user) return [];

        //echo $user;

//        if ($user->cannot('admin')) return [];

        if ($user->hasRole('admin')) {

            $items = self::getItems();

            $res = collect();

            $res->add($items['dashboard']);
            $res->add($items['cities']);
            $res->add($items['users']);
            $res->add($items['services']);
            $res->add($items['review-type']);
            $res->add($items['approve']);

            $res->add($items['jobs']);
            $res->add($items['contracts']);
            $res->add($items['offers']);
            $res->add($items['responses']);

            $res->filter()
                ->values()
                ->toArray();

            return $res;
        }
        elseif ($user->hasRole('user')) {
            $items = self::getItems();
            $res = collect();

            $res->add([
                'name' => $items['employee']['name'],
                'icon' => $items['employee']['icon'],
                'items' => [
                    $items['projectSearch'],
                    $items['servicesAndWorkingConditions'],
                    $items['portfolio']
                ]
            ]);

            $res->add([
                'name' => $items['employer']['name'],
                'icon' => $items['employer']['icon'],
                'items' => [
                    $items['employeeSearch'],
                    $items['myProjects'],
                ]
            ]);
            $res->add($items['userProfile']);
            $res->add($items['myContracts']);
            $res->add($items['blacklist']);
            $res->add($items['rates']);

            $res->filter()
                ->values()
                ->toArray();

            return $res;
        }
         return [];
    }
}
