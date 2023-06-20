#!/bin/sh
envsubst '${NGINX_HOST}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

exec "$@"
