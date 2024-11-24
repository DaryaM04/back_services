FROM php:8.2-fpm

ENV PHP_MEMORY_LIMIT=1024M
ENV POST_MAX_SIZE = 70M
ENV UPLOAD_MAX_FILESIZE = 70M

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip

#RUN apt-get update && apt-get install -y \
#    software-properties-common \
#    npm
#RUN npm install npm@latest -g && \
#    npm install n -g && \
#    n latest

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install zip pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

ADD composer.json ./
RUN composer install --prefer-dist --no-scripts --no-autoloader --no-interaction --no-ansi --optimize-autoloader


# Set working directory
WORKDIR /var/www
