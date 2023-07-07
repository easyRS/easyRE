#!/bin/sh
if [ ! -f /etc/nginx/conf.d/default.temp ]; then
  touch /etc/nginx/conf.d/default.temp
fi
cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.temp
envsubst '${NGINX_HOST}' < /etc/nginx/conf.d/default.temp > /etc/nginx/conf.d/default.conf

exec "$@"
