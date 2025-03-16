#!/bin/bash

until pg_isready -h db -p 5432 -U postgres; do
  sleep 2
done

# Migrate database
php bin/console doctrine:migrations:migrate

exec php-fpm
