<?php

namespace App\Models;

use App\Enums\JobStatus;
use App\Enums\JobType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'status',
        'address',
        'date_to',
        'photo',
        'description',
        'tel',
        'type',
        'options',
    ];

    protected $casts = [
        'options' => 'json',
        'date_to' => 'date',
        'status' => JobStatus::class,
        'type' => JobType::class,
    ];

    public function user(): belongsTo
    {
        return $this->belongsToOne(User::class);
    }

    public function services(): belongsToMany
    {
        return $this->belongsToMany(Service::class);
    }
}
