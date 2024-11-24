<?php

namespace App\Packages\Common\Domain;

class PermissionDTO
{
    /*
     * [
     *      "type" => 'U'
     *      "id" => 34
     *      "name" => 'John Do'
     * ]
    */
    public string $type;

    public string $id;

    public string $name;

    public function __construct(...$params)
    {
        $this->type = $params['type'];
        $this->id = $params['id'];
        $this->name = $params['name'];
    }

    //    public function toArray() {
    //        return [
    //            'type' => $this->type,
    //            'id' => $this->id,
    //            'name' => $this->name
    //        ];
    //    }
}
