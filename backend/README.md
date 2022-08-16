# Laravel 8 Backend end for User Info

This project handles the addition of users to the database.

## commands to run
```
cd backend
npm install
php artisan migrate
php artisan serve
```

## .env file should be added with the following variables
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel #database name
DB_USERNAME=root #database username
DB_PASSWORD=     #database password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```
