<?php

namespace App\Models;

use App\Casts\Decode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $table = 'countries';

    protected $fillable = [
        'name',
        'flag',
        'code',
        'local',
    ];

    protected $casts = [
        'flag' => Decode::class,
        'code' => 'string',
    ];
}
