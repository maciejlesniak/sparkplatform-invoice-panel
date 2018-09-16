FROM nginx:alpine
MAINTAINER docker@sparkidea.pl

COPY config/conf.nginx /etc/nginx/nginx.conf
COPY html/* /usr/share/nginx/html/

COPY ssl/ca.crt /etc/nginx/sslcerts/ca.crt
COPY ssl/ca.key /etc/nginx/sslcerts/ca.key
COPY ssl/keypass /etc/nginx/sslcerts/keypass

COPY ssl/ca.crt /etc/nginx/sslcerts/client1.crt
