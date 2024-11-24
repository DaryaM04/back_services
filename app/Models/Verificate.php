<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Verificate extends Model
{
    use HasFactory;

    protected $table = 'verificate';

    protected $fillable = [
        'phone',
        'code',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
