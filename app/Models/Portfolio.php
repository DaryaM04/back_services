<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'user_id',
        'description',
        'price',
        'photo',
        'active',
        'options',
        'service_id',
        'service_name',
    ];

     //связь с моделью услуги
     public function service()
     {
         return $this->belongsTo(Service::class, 'user_id', 'id');
     }
 
     //связь с моделью пользователя
     public function user()
     {
         return $this->belongsTo(User::class,  'service_id', 'id');
     }
 
}
