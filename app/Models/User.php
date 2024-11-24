<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

enum user_status_domain: string {
    case active = 'active';
    case blocked = 'blocked';
};
enum profile_type_domain: string {
    case user = 'user';
    case company = 'company';
}

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'profile_id',
        'profile_type',
        'phone',
        'password',
        'email',
        'status',
    ];
 
    protected $appends = ['avatar'];
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
        'local' => 'string',
    ];

    public function getAvatarAttribute() : string|null
    {
        return $this->profile?->photo;
    }

    public function isUser(): bool
    {
        return $this->profile_type === "App\Models\UserProfile";
    }

    public function isCompany(): bool
    {
        return $this->profile_type === "App\Models\CompanyProfile";
    }


    public static function profile_type_domain(): array
    {
        return [
            'profile_type_domain' => profile_type_domain::cases()
        ];
    }

    public static function status_domain(): array
    {
        return [
            'user_status_domain' => user_status_domain::cases()
        ];
    }

    public function verificate(): HasOne
    {
        return $this->hasOne(Verificate::class, 'phone', 'phone');
    }

    public function profile(): MorphTo
    {
        return $this->morphTo();
    }

}
