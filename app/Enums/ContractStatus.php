<?php

namespace App\Enums;

enum ContractStatus: int
{
    case New = 0;
    case Pending = 1;
    case Canceled = 2;
    case Closed = 3;
}
