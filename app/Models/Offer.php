<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
    ];

    public function user(): belongsTo
    {
        return $this->belongsToOne(User::class);
    }

    public function job(): belongsTo
    {
        return $this->belongsTo(Job::class);
    }

}
