<?php

namespace App\Enums;

enum VerificationType: int
{
    case New = 0;
    case Verified = 1;
    case Declined = 2;
}
