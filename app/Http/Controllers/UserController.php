<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller as BaseController;
use App\Models\City;
use App\Models\Service;
use App\Models\User;
use App\Packages\Common\Application\Services\PermissionHistoryService;
use App\Packages\Common\Application\Services\UserInvitationService;
use App\Packages\Common\Infrastructure\Services\AuthorisationService;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Spatie\Multitenancy\Models\Tenant;

class UserController extends BaseController
{
    /**
     * User profile.
     *
     * @return \Inertia\Response
     */
    public function profile()
    {
        $user = Auth::user();
        $user->profile->load('services');
        $services = Service::query()->where('active', true)->get();
        $cities = City::getLocalizedCities();
//        $user->roles;
        // $roles = AuthorisationService::prepareRolesForEdit("U{$user->id}");
        $roles = $user->load('roles');

        return Inertia::render('User/Profile', compact('user', 'roles', 'cities', 'services'));
    }

    public function update(Request $request)
    {
        $request->merge([
            'full_name' => $request->input('name').' '.$request->input('last_name'),
            'passport_data' => ['country' => $request->input('country'), 'passport_sn' => $request->input('passport_sn')],
            'options' => ['options' => $request->input('options')],
        ]);

        $input = $request->all();

        $request->validate([
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'exists:users'],
        ]);

        // user changes password
        if ($input['password']) {
            $request->validate([
                'password' => [Rules\Password::defaults()],
            ]);
            $input['password'] = Hash::make($input['password'], ['rounds' => 12]);
        } else {
            unset($input['password']);
        }

        // avatar
        if (! $input['avatar']) {
            // clear old avatar
            $oldFile = Auth::user()->profile->photo;
            if ($oldFile) {
                Storage::delete($oldFile);
            }
        }
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            // replace avatar
            $oldFile = Auth::user()->profile->photo;
            $avatarPath = '/'.$request->avatar->store('photo');
            $input['avatar'] = $avatarPath;
            if ($oldFile) {
                Storage::delete($oldFile);
            }
        }

        $user = User::query()->update(
            [
                'id' => Auth::user()->id,
            ],
            $input
        );

        $user->profile()->updateOrCreate(
            [
                'user_id' => Auth::user()->id,
            ],
            [
                'full_name' => $request->input('full_name'),
                'passport_data' => $request->input('passport_data'),
                'options' => $request->input('options'),
            ]
        );

        Auth::loginUsingId($user->id);

        //        session()->put([
        //            'password_hash_' . auth()->getDefaultDriver() => Auth::user()->getAuthPassword()
        //        ]);

        return back()->with([
            'message' => __('User`s profile has been updated successfully!'),
        ]);

    }

    // ****************************
    // Inviting
    // ****************************
    public function inviteCreate(Request $request)
    {
        $permissionHistory = (new PermissionHistoryService())->getPermissionHistory();

        return Inertia::render('Pages/InviteUser', compact('permissionHistory'));
    }

    public function inviteSend(Request $request, UserInvitationService $uis)
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        $email = $request->email;
        $permissions = $request->permissions;

        $uis->sendInvite($email, $permissions);

        return back()->with([
            'message' => __('User has been invited successfully!'),
        ]);
    }

    public function inviteAccept(Request $request, UserInvitationService $uis)
    {
        if ($request->isMethod('post')) {

            $request->validate([
                'email' => 'required|string|email|max:255|unique:users,email',
                'name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'max:255',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $avatarPath = '';
            if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
                $avatarPath = '/'.$request->avatar->store('images/'.explode('.', $_SERVER['HTTP_HOST'])[0].'/avatars');
            }

            $user = User::firstOrCreate(['email' => $request->email], [
                'name' => $request->name,
                'last_name' => $request->last_name,
                'phone' => $request->phone ?? '',
                'password' => Hash::make($request->password),
                'avatar' => $avatarPath,
            ]);

            $uis->acceptInvite($user['email'], $user['id']);

            $permissions = collect($request->permissions);
            $permissions->each(function ($e) use ($user) {
                // if ($e['type'] == 'T') {
                //     $team = Team::find($e['id']);
                //     if ($team) {
                //         $team->users()->attach($user->id);
                //     }
                // } elseif ($e['type'] == 'D') {
                //     $dep = Department::find($e['id']);
                //     if ($dep) {
                //         $dep->users()->attach($user->id);
                //     }
                // }
                $sub = $e['type'].$e['id'];
                AuthorisationService::addRoleForUser("U{$user->id}", $sub);
            });

            Auth::login($user);

            return Redirect::route('learning')->with([
                'message' => __('messages.You have registered successfully!'),
            ]);

        } else {
            $user = $request->all();

            // check if user has already registered
            $rec = User::where('email', $user['email'])->first();
            if ($rec) {
                return Redirect::route('login')->with([
                    'status' => __('messages.You have already registered, please log in.'),
                ]);
            }

            // not yet, let fill user's data
            return Inertia::render('Public/RegisterUserByInvite', compact('user'));
        }
    }

    public function justRegistered(Request $request, string $token)
    {
        if ($token) {
            $tenant = Tenant::where('just_created_token', $token)->first();
            logger('First login: '.$tenant->name);
            if ($tenant) {
                $user = User::findOrFail(1);
                Auth::login($user);
                $tenant->just_created_token = null;
                $tenant->save();
                event(new Registered($user));
            }
        }

        return Redirect::intended(RouteServiceProvider::getHomeLink());
    }
}
