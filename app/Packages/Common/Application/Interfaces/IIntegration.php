<?php

namespace App\Packages\Common\Application\Interfaces;

interface IIntegration
{
    public function getUsers(): array;

    public function getDepartments(): array;
}
