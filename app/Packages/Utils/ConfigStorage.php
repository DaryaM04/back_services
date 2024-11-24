<?php

namespace App\Packages\Utils;

class ConfigStorage
{
    protected static array $data;

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::$data[$key] ?? $default;
        //        return session($key, $default);
    }

    public static function set(string $key, mixed $value): void
    {
        static::$data[$key] = $value;
        //        session([$key => $value]);
    }
}
