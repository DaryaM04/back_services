#!/bin/bash

composer install

php artisan migrate --seed

chmod 777 -R storage/
