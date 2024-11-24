<?php

namespace App\Packages\Common\Application\Interfaces;

use App\Models\Common\Media;
use Illuminate\Http\UploadedFile;

interface IMediaService
{
    public function saveMedia(UploadedFile $media, string $module = '', string $section = '', string $driver = 'local'): int;

    public function getMedia(int $id): Media|null;

    public function deleteMedia(int $id);
}
