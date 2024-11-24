<?php

namespace App\Packages\Learn\Entities;

enum CourseStatus: string
{
    case NEW = 'new';
    case IN_PROGRESS = 'in_progress';
    case DONE = 'done';
}
