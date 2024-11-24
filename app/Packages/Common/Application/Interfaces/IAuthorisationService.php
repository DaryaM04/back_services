<?php

namespace App\Packages\Common\Application\Interfaces;

interface IAuthorisationService
{
    public function authorize(string $obj, string $act): void;

    public function authorized(string $obj, string $act): bool;

    public function authorizedFor(int $user_id, string $obj, string $act): bool;

    public static function checkPermission(string $sub, string $obj, string $act): bool;

    // Roles
    public static function deleteRoleForUser(string $user, string $role): bool;

    public static function addRoleForUser(string $user, string $role): bool;

    public function hasRoleForUser(string $user, string $role): bool;

    public function getRolesForUser(string $user): array;

    // Policies
    public static function addPolicy(string $sub, string $obj, string $act): bool;

    public static function removePolicy($params): bool;

    public static function removeFilteredPolicy(...$params): bool;
}
