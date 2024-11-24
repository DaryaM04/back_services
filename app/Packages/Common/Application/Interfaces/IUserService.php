<?php

namespace App\Packages\Common\Application\Interfaces;

use App\Packages\Common\Domain\UserDTO;

interface IUserService
{
    public function currentUser(): UserDTO;

    public function getUser(int $uid): UserDTO;
}
