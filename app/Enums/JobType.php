<?php

namespace App\Enums;

enum JobType: int
{
    case Hiring = 0;
    case Project = 1;
    case Complex = 2;
}
