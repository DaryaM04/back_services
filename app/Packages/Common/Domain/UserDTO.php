<?php

namespace App\Packages\Common\Domain;

class UserDTO
{
    public int $id;

    public string $email;

    public string $name;

    public string|null $last_name;

    public string|null $avatar;

    public string $status;

    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    public function FIO(): string
    {
        return trim("$this->name $this->last_name");
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * @param  int  $id
     * @param  string  $email
     * @param  string  $name
     */
    //    public function __construct(int $id, string $email, string $name)
    //    {
    //        $this->id = $id;
    //        $this->email = $email;
    //        $this->name = $name;
    //    }

}
