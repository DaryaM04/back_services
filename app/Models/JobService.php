<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class JobService extends Model
{
    use HasFactory;

    protected $table = 'job_service';

    protected $fillable = [
        'price',
    ];

    public function job(): belongsTo
    {
        return $this->belongsToOne(Job::class);
    }

    public function service(): belongsTo
    {
        return $this->belongsToOne(Service::class);
    }

}
