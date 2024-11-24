<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Models\User;
use App\Packages\Common\Application\Interfaces\IUserService;
use App\Packages\Common\Domain\UserDTO;
use Illuminate\Support\Facades\Auth;

class UserService implements IUserService
{
    public function currentUser(): UserDTO
    {
        $user = Auth::user();

        return new UserDTO($user->toArray());
    }

    public function getUser(int $uid): UserDTO
    {
        $user = User::find($uid);

        return new UserDTO($user->toArray());
    }
}
