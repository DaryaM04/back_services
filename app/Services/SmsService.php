<?php

namespace App\Services;

use ClickSend\Api\SMSApi;
use ClickSend\ApiException;
use ClickSend\Configuration;
use ClickSend\Model\SmsMessage;
use ClickSend\Model\SmsMessageCollection;
use GuzzleHttp\Client;

class SmsService
{
    private SMSApi $api;

    public function __construct()
    {
        // кладёт страницу регистрации
//        $config = Configuration::getDefaultConfiguration()
//            ->setUsername(config('services.sms_api.click_send.username'))
//            ->setPassword(config('services.sms_api.click_send.password'));
//
//        $this->api = new SMSApi(
//            new Client(),
//            $config
//        );
    }

    /**
     * @throws ApiException
     */
    public function sendSms(string $phone, string $code): string
    {
        $msg = new SmsMessage();
        $msg->setBody($code);
        $msg->setTo($phone);
        $msg->setSource('sdk');

        $sms_messages = new SmsMessageCollection();
        $sms_messages->setMessages([$msg]);

        return $this->api->smsSendPost($sms_messages);
    }
}
