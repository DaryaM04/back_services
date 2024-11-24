<?php

namespace App\Services;

use App\Models\Verificate;

class VerificationService
{
    public function sms(string $phone, string|int $code): void
    {
        // updateOrCreate создает записи с новым кодом, поэтому он не подходит
        $exists = Verificate::query()->where([
            'phone' => $phone
        ])->exists();
        if($exists)
            Verificate::query()->where('phone', $phone)->update([
                'phone' => $phone,
                'code' => $code,
            ]);
        else
            Verificate::query()->where('phone', $phone)->create([
                'phone' => $phone,
                'code' => $code,
            ]);
    }
}
