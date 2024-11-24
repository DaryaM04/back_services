<?php

namespace App\Packages\Common\Infrastructure\Integrations;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Laravel\Socialite\Facades\Socialite;

class IntegrationService
{
    /**
     * Set config for Socialite OAuth Auth (TODO: hard code!!!)
     *
     * @param $integration
     */
    public static function setConfig()
    {
        $tenant = app('currentTenant');
        $options = json_decode($tenant?->options);
        $integration = $options?->integration ?? null;
        switch ($integration?->type) {
            case 'bitrix24':
                if (App::environment(['local'])) {
                    $config = [
                        'endpoint' => env('BITRIX24_ENDPOINT_URI'),
                        'client_id' => env('BITRIX24_CLIENT_ID'),
                        'client_secret' => env('BITRIX24_CLIENT_SECRET'),
                        'redirect' => env('BITRIX24_REDIRECT_URI'),
                    ];
                } else {
                    $config = [
                        'endpoint' => $integration->endpoint,
                        'client_id' => $integration->client_id,
                        'client_secret' => $integration->client_secret,
                        'redirect' => $integration->redirect,
                    ];
                }

                Config::set('services.bitrix24', $config);
                break;
        }
    }

    /**
     * @return false|RedirectResponse
     *
     * Check integration existing, redirect to the login page
     */
    public static function checkIntegration(): false|RedirectResponse
    {
        $tenant = app('currentTenant');
        $options = json_decode($tenant?->options);
        $integration = $options?->integration ?? null;
        switch ($integration?->type) {
            case 'bitrix24':
                IntegrationService::setConfig($integration);

                return Socialite::driver('bitrix24')->redirect();
            case 'intrum':
        }

        return false;
    }
}
