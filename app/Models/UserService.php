<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserService extends Model
{
    use HasFactory;

    protected $table = 'user_services';
    protected $primaryKey = 'id';

    protected $fillable = [
        'service_id', 'user_id',
        'is_by_agreement',
        'is_hourly_type',
        'is_work_type',
        'hourly_payment',
        'work_payment',
        'is_active',
    ];

    //связь с моделью услуги
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    //связь с моделью пользователя
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
