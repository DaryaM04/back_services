<?php

namespace App\Packages\Common\Application\Services;

use Illuminate\Mail\Mailable;

class MailService extends Mailable
{
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject($this->data['subject'])
            ->view($this->data['view'])
            ->with($this->data['mailData'] ?? null);
    }
}
