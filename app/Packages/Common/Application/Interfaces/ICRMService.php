<?php

namespace App\Packages\Common\Application\Interfaces;

interface ICRMService
{
    public function createNewLead(array $data): array;
}
