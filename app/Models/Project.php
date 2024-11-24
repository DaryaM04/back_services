<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_name', 'description',
        'project_type', 'start_date',
        'end_date', 'payment_type',
        'photo', 'user_id',
        'city_id',
    ];

    protected $casts = [
        'project_type' => 'array',
        'payment_type' => 'array',
    ];
}
