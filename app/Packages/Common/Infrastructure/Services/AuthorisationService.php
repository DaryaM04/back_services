<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Models\Common\Team;
use App\Models\OrgBoard\Department;
use App\Models\User;
use App\Packages\Common\Application\Events\EntityCreated;
use App\Packages\Common\Application\Events\EntityDeleted;
use App\Packages\Common\Application\Interfaces\IAuthorisationService;
use App\Packages\Common\Domain\PermissionDTO;
use Lauthz\Facades\Enforcer;
use Symfony\Component\HttpFoundation\Response;

class AuthorisationService implements IAuthorisationService
{
    public function __construct(
        public UserService $userService
    ) {
    }

    public function authorize(string $obj, string $act): void
    {
        $authorized = $this->authorized($obj, $act);
        if (! $authorized) {
            abort(Response::HTTP_UNAUTHORIZED, 'You don\'t have access to this resource.');
        }
    }

    public function authorized(string $obj, string $act): bool
    {
        $user_id = $this->userService->currentUser()->id;

        return $this->authorizedFor($user_id, $obj, $act);
    }

    public function authorizedFor(int $user_id, string $obj, string $act): bool
    {
        $sub = "U$user_id";

        $isAdmin = $this->hasRoleForUser($sub, 'ADMIN');
        if ($isAdmin) {
            return true;
        }

        $res = Enforcer::GetImplicitPermissionsForUser($sub);
        $res = collect($res)
            ->filter(fn ($e) => $e[1] == $obj);

        return $res->isNotEmpty();
    }

    public static function checkPermission(string $sub, string $obj, string $act): bool
    {
        return Enforcer::enforce($sub, $obj, $act);
    }

    public static function deleteRoleForUser(string $user, string $role): bool
    {
        return Enforcer::deleteRoleForUser($user, $role);
    }

    public static function deleteRolesForUser(string $user): bool
    {
        return Enforcer::deleteRolesForUser($user);
    }

    public static function addRoleForUser(string $user, string $role): bool
    {
        return Enforcer::addRoleForUser($user, $role);
    }

    public function hasRoleForUser(string $user, string $role): bool
    {
        return Enforcer::hasRoleForUser($user, $role);
    }

    public function getRolesForUser(string $user): array
    {
        return Enforcer::getRolesForUser($user);
    }

    public function getUsersForRole(string $role): array
    {
        return Enforcer::getUsersForRole($role);
    }

    //Enforcer::addPolicy('DH1', 'LC1', 'edit');
    //Enforcer::addPolicy('AU', 'LC1', 'read');
    //Enforcer::addPolicy('AU', 'LC2', 'read');
    public static function addPolicy(string $sub, string $obj, string $act): bool
    {
        return Enforcer::addPolicy($sub, $obj, $act);
    }

    public static function removePolicy(...$params): bool
    {
        return Enforcer::removePolicy(...$params);
    }

    public static function removeFilteredPolicy(...$params): bool
    {
        return Enforcer::removeFilteredPolicy(...$params);
    }

    // for users
    public static function prepareRolesForEdit($obj)
    {
        $roles = [];
        $permData = Enforcer::GetRolesForUser($obj);
        foreach ($permData as $value) {
            $sub = $value[0];

            if ($sub[0] == 'T') {
                $id = substr($value, 1);
                $item = Team::find($id);
                if ($item) {
                    $roles[] = [
                        'type' => 'T',
                        'id' => $item->id,
                        'name' => $item->name,
                    ];
                }
            } elseif ($sub[0] == 'D') {
                $id = substr($value, 1);
                $item = Department::find($id);
                if ($item) {
                    $roles[] = [
                        'type' => 'D',
                        'id' => $item->id,
                        'name' => $item->name,
                    ];
                }
            } elseif ($value == 'AU') {
                $roles[] = new PermissionDTO(...[
                    'type' => 'O',
                    'id' => 'AU',
                    'name' => 'All Users',
                ]);
            }
        }

        return $roles;
    }

    public static function preparePermissionsForEdit($obj)
    {
        // TODO: убрать зависимость от моделей ?
        $permissions = [];
        $permData = Enforcer::getFilteredPolicy(1, $obj);
        foreach ($permData as $value) {
            $sub = $value[0];

            if ($sub[0] == 'U') {
                $id = substr($sub, 1);
                $item = User::find($id);
                if ($item) {
                    $permissions[] = [
                        'type' => 'U',
                        'id' => $item->id,
                        'name' => $item->name.' '.$item->last_name,
                    ];
                }
            } elseif ($sub[0] == 'T') {
                $id = substr($sub, 1);
                $item = Team::find($id);
                if ($item) {
                    $permissions[] = [
                        'type' => 'T',
                        'id' => $item->id,
                        'name' => $item->name,
                    ];
                }
            } elseif ($sub[0] == 'D') {
                $id = substr($sub, 1);
                $item = Department::find($id);
                if ($item) {
                    $permissions[] = [
                        'type' => 'D',
                        'id' => $item->id,
                        'name' => $item->name,
                    ];
                }
            } elseif ($sub == 'AU') {
                $permissions[] = new PermissionDTO(...[
                    'type' => 'O',
                    'id' => 'AU',
                    'name' => 'All Users',
                ]);
            }
        }

        return $permissions;
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     * @return string[]
     */
    public function subscribe($events): array
    {
        return [
            EntityDeleted::class => 'entityDeletedEventListener',
            EntityCreated::class => 'entityCreatedEventListener',
        ];

    }

    public function entityDeletedEventListener(EntityDeleted $event)
    {
        $perm = $event->permission;
        $obj = $perm->type.$perm->id;
        // delete Objects
        static::removeFilteredPolicy(0, $obj);
        // delete Subjects
        static::removeFilteredPolicy(1, $obj);
        // delete Roles
        collect(Enforcer::GetUsersForRole($obj))
            ->each(fn ($e) => Enforcer::deleteRoleForUser($e, $obj));
        if ($perm->type == 'U') {
            static::deleteRoleForUser($obj, 'AU');
        }
    }

    public function entityCreatedEventListener(EntityCreated $event)
    {
        $perm = $event->permission;
        $obj = $perm->type.$perm->id;
        if ($perm->type == 'U') {
            static::addRoleForUser($obj, 'AU');
        }
    }
}
