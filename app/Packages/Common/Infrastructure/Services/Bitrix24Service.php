<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Packages\Common\Application\Interfaces\ICRMService;

class Bitrix24Service implements ICRMService
{
    private string $bitrixUrl;

    private int $userId;

    private string $webHookCode;

    public function __construct()
    {
        $this->bitrixUrl = env('BITRIX24_URL');
        $this->userId = env('BITRIX24_USER_ID');
        $this->webHookCode = env('BITRIX24_SECRET_KEY');
    }

    /**
     * @throws \Exception
     */
    public function createNewLead(array $data): array
    {
        $queryUrl = $this->getApiUrl('crm.lead.add');

        $queryData = http_build_query($data);

        return $this->curl($queryUrl, $queryData);
    }

    /**
     * Example: https://your-domen.bitrix24.ru/rest/13/9cybrkhzxxf28zl4/profile/
     */
    private function getApiUrl(string $method = ''): string
    {
        return $this->bitrixUrl.'/rest/'.$this->userId.'/'.$this->webHookCode.'/'.$method;
    }

    /**
     * @throws \Exception
     */
    private function curl(string $queryUrl, string $queryData): array
    {
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $queryUrl,
            CURLOPT_POSTFIELDS => $queryData,
        ]);
        $result = curl_exec($curl);
        curl_close($curl);
        $result = json_decode($result, 1);

        if (array_key_exists('error', $result)) {
            return [
                'success' => false,
                'message' => $result['error_description'],
            ];
        }

        return [
            'success' => true,
            'message' => $result,
        ];
    }
}
