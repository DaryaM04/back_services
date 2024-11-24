<?php

namespace App\Http\Middleware;

use App\Packages\Common\Application\Services\MenuService;
use App\Packages\Utils\ConfigStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array
     */
    public function share(Request $request)
    {

        $result = array_merge(parent::share($request));

        $result = array_merge($result, [
            'notification' => [
                'position' => fn () => $request->session()->get('position'),
                'type' => fn () => $request->session()->get('type'),
                'header' => fn () => $request->session()->get('header'),
                'message' => fn () => $request->session()->get('message'),
            ],
        ]);

        if ($result) {

            // setting available Modules
            $modules = [];

            if (app()->isLocal() && empty($modules)) {
                $modules = ['LC', 'OB', 'CP'];
            }
            ConfigStorage::set('modules', $modules);

            $user = Auth::user();

            $result = array_merge($result, [
                'auth.user' => fn () => $user?->only('id', 'name', 'last_name', 'email', 'avatar', 'isAdmin'),
                'topMenu' => MenuService::buildTopMenu(),
                'userMenu' => MenuService::buildUserMenu(),
                'leftMenu' => MenuService::buildLeftMenu(),
            ]);

            $result = array_merge($result);
        }

        $result = array_merge($result, [
            'langs' => [
                'en',
                'ru',
                'he',
                'ar'
            ],
        ]);

        $result = array_merge($result, [
            'locale' => function () {
                return app()->getLocale();
            },
            'translations' => function () {
                $json = resource_path('lang/'.app()->getLocale().'.json');
                if (! file_exists($json)) {
                    return [];
                }

                return json_decode(file_get_contents($json), true);
            },
        ]);

        return $result;
    }
}
