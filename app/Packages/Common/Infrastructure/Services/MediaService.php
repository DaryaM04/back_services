<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Models\Common\Media;
use App\Packages\Common\Application\Interfaces\IMediaService;
use Illuminate\Http\UploadedFile;

class MediaService implements IMediaService
{
    public function saveMedia(UploadedFile $media, string $module = '', string $section = '', string $folder = '', string $driver = 'local'): int
    {
        $tenant = app('currentTenant')->name;
        $path = $media->store('/files/'.$tenant.'/media'.(empty($folder) ? '' : "/$folder"), $driver);
        $data = [
            'path' => '/'.$path,  // ???? path without leading trail!
            'original_name' => $media->getClientOriginalName(),
            'size' => $media->getSize(),
            'type' => $media->getMimeType(),
            'section' => $section,
            'module' => $module,
        ];
        $rec = Media::create($data);

        return $rec->id;
    }

    public function getMedia(int $id): Media|null
    {
        $rec = Media::find($id);
        if (! $rec) {
            return null;
        }

        return $rec;
    }

    public function deleteMedia(int $id)
    {
        Media::destroy($id);
    }
}
