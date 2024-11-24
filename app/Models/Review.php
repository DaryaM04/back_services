<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'active',
        'review_type_id',
        'review_type_value_id',
        'comment',
    ];

    public function reviewable(): MorphTo
    {
        return $this->morphTo();
    }
}
