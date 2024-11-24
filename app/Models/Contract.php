<?php

namespace App\Models;

use App\Enums\ContractStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'status',
        'employer_feedback',
        'employee_feedback',
        'closed_at',
        'options',
    ];

    protected $casts = [
        'options' => 'json',
        'closed_at' => 'date',
        'status' => ContractStatus::class,
    ];

    public function user(): hasOne
    {
        return $this->hasOne(User::class);
    }

    public function jobService(): hasMany
    {
        return $this->hasMany(JobService::class);
    }

}
