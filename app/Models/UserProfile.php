<?php

namespace App\Models;

use App\Enums\VerificationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class UserProfile extends Model
{
    use HasFactory;

    // TODO: add video field
    protected $fillable = [
        'user_id',
        'is_verified',
        'photo',
        'first_name',
        'last_name',
        'has_brigade',
        'passport_data',
        'options',
        'city_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'passport_data' => 'array',
        'options' => 'array',
        'is_verified' => VerificationType::class,
    ];

    public function services(): belongsToMany
    {
        return $this->belongsToMany(Service::class, 'user_profile_service');
    }

    public function city(): hasOne
    {
        return $this->hasOne(City::class);
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function languages(): belongsToMany
    {
        return $this->belongsToMany(Language::class, 'user_profile_language');
    }
}
