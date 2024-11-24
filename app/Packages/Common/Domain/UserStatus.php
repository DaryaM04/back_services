<?php

namespace App\Packages\Common\Domain;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case BLOCKED = 'blocked';
}
