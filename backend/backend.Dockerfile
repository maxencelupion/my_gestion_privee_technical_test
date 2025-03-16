FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip mbstring \
    && apt-get install -y postgresql-client

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock /var/www/html/

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . /var/www/html

COPY scripts /scripts

RUN chmod +x /scripts/start.sh

RUN mkdir -p /var/www/html/var /var/www/html/bin

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/var /var/www/html/bin

EXPOSE 9000

CMD ["/scripts/start.sh"]
