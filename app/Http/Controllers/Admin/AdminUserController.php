<?php

namespace App\Http\Controllers\Admin;

use App\Models\Language;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\CompanyProfile;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(Request $request): Response|LengthAwarePaginator
    {
        if ($request->has('page')) {
            $paginatedList = $this->getIndexList(User::class, $request, 0, 0, ['roles', 'profile'], [
                'sortBy' => 'created_at',
                'sortDir' => 'desc',
            ]);
            return $paginatedList;
        }

        return Inertia::render('Admin/User/Users', [
            ...Role::name_domain(),
            ...User::profile_type_domain(),
            ...User::status_domain()
        ]);
    }

    protected function getIndexList($class, Request $request, $columns = [], $excludedColumns = [], $withRelations = [], $sort = []): LengthAwarePaginator
    {
        $params = $this->getQueryParameters($request);

        $res = $class::query();
        if (!empty($withRelations)) {
            $res = $res->with($withRelations);
        }

        // group fields by type of relation
        $fieldTypes = [
            'profile_type' => 'simple',
            'email' => 'simple',
            'phone' => 'simple',
            'status' => 'simple',
            'name' => 'relation_morph_profile',
            'is_verified' => 'relation_morph_profile',
            'role' => 'relation_role'
        ];

        // use own strategy for each filter categories
        foreach ($params['filters'] as $filter) {
            $field_name = $filter[0];
            $res = match ($fieldTypes[$field_name]) {
                'simple' => $res->where(...$filter),
                'relation_morph_profile' => $res->whereHasMorph('profile', [UserProfile::class, CompanyProfile::class],
                    function (Builder $query) use ($filter) {
                        $query->where(...$filter);
                    }
                ),
                'relation_role' => $res->whereHas('roles', function (Builder $query) use ($filter) {
                    $query->where('name', 'like', $filter[2]);
                })
            };
        }

        if (!empty($columns)) {
            $res = $res->select($columns);
        }

        if (!empty($excludedColumns)) {
            $res = $res->exclude($excludedColumns);
        }

        if (!empty($params['sortBy'])) {
            $res = match ($fieldTypes[$params['sortBy']]) {
                'simple' => $res->orderBy($params['sortBy'], $params['sortDir']),
                'relation_morph_profile' => $res->whereHasMorph('profile', [UserProfile::class, CompanyProfile::class],
                    function (Builder $query) use ($params) {
                        $query->orderBy($params['sortBy'], $params['sortDir']);
                    }
                ),
                'relation_role' => $res->whereHas('roles', function (Builder $query) use ($params) {
                    $query->orderBy('name', $params['sortDir']);
                })
            };

        } elseif (!empty($sort['sortBy'])) {
            $res = $res->orderBy($sort['sortBy'], $sort['sortDir']);
        }

        return $res->paginate($params['perPage']);
    }

    public function create(): Response
    {
        $services = Service::query()->where('active', true)->get()
            ->map(fn ($service) => $service->localized());
        $cities = City::getLocalizedCities();
        $languages = Language::query()
            ->where('active', true)->get();
        return Inertia::render('Admin/User/EditUser', compact('services', 'cities', 'languages'));
    }

    public function edit(User $user): Response
    {
        // fetch profile and services
        $user->profile->load('services');
        $user->profile->load('languages');
        $user->load('roles');
        $services = Service::query()->where('active', true)->get()
            ->map(fn ($service) => $service->localized());
        $cities = City::getLocalizedCities();
        $languages = Language::query()
            ->where('active', true)->get();
        return Inertia::render('Admin/User/EditUser', compact('user', 'services', 'cities', 'languages'));
    }


    public function store(Request $request): RedirectResponse
    {
        return $this->updateOrCreateUser($request, null)->with([
            'message' => trans('user.created'),
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        return $this->updateOrCreateUser($request, $id)->with([
            'message' => trans('user.updated'),
        ]);
    }

    protected function updateOrCreateUser(Request $request, int|null $id)
    {
        $isNewUser = is_null($id);
        if(!$isNewUser)
            $original_user = User::findOrFail($id);
        else
            $original_user = null;
        // validate separately
        $profileType = $request->validate([
            'profileType' => ['required', 'string']
        ])['profileType'];
        // collect all rules
        $userRules = [
            'phone' => ['required', 'string'],
            'status' => ['required', 'string'],
            'email' => ['sometimes'],
        ];
        if ($isNewUser || $request['password']) {
            $userRules['password'] = ['required', 'confirmed', Rules\Password::defaults()];
        }
        if ($isNewUser) {
            $userRules['phone'] = ['required', 'string', 'unique:users,phone'];
        }

        $profileRules = match ($profileType) {
            'user' => [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'has_brigade' => ['required', 'bool'],
                'city_id' => ['required', 'numeric'],
                'is_verified' => ['required', 'bool']
            ],
            'company' => [
                'name' => ['required', 'string'],
                'city_id' => ['required', 'numeric'],
                'is_verified' => ['required', 'bool']
            ],
            default => throw new \Exception('profileType is not recognized'),
        };
        $serviceRules = ['services' => ['required', 'array']];
        $languagesRules = ['languages' => ['required', 'array']];

        $request->validate([
            ...$userRules,
            ...$profileRules,
            ...$serviceRules,
            ...$languagesRules
        ]);

        $userData = $request->validate($userRules);
        if ($request['password'])
            $userData['password'] = Hash::make($userData['password']);
        $profileData = $request->validate($profileRules);
        $services = $request->validate($serviceRules)['services'];
        $languages = $request->validate($languagesRules)['languages'];

        $photo = $request->file('photo');
        if (!is_null($photo)) {
            $photo->store('public/img');
            $photoPath = '/storage/img/' . $photo->hashName();
        } else {
            $photoPath = $request->photo ?? '';
        }

        DB::beginTransaction();
        try {
            $user = User::updateOrCreate(['id' => $id], $userData);

            if (!$isNewUser)
                $user->roles()->detach();
            if ($request->input('admin'))
                $user->assignRole('admin');
            else
                $user->assignRole('user');

            // если админ изменил телефон, то обновим верификацию
            if ($original_user?->phone !== $user->phone)
                $user->verificate()->create([
                    'phone' => $user->phone,
                    'code' => random_int(1000, 9999),
                    'status' => 1
                ]);

            $profile = match ($isNewUser) {
                true => match ($profileType) {
                    'user' => new UserProfile([
                        'user_id' => $user->id,
                        ...$profileData,
                        'photo' => $photoPath
                    ]),
                    'company' => new CompanyProfile([
                        'user_id' => $user->id,
                        ...$profileData,
                        'photo' => $photoPath
                    ]),
                    default => throw new \Exception('profileType is not recognized')
                },
                false => $user->profile
            };
            if($isNewUser) {
                $profile->save();
                $profile->user()->save($user);
            } else {
                $user->profile()->update([
                    ...$profileData,
                    'photo' => $photoPath
                ]);
                $profile->services()->detach();
                $profile->languages()->detach();
            }
            $profile->services()->attach($services);
            $profile->languages()->attach($languages);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage());
        }

        return Redirect::route('admin.users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return Redirect::route('admin.users.index')->with([
            'message' => trans('user.deleted'),
        ]);
    }
}
