FROM node:16-slim

WORKDIR /var/www/html
COPY ["build", "/var/www/html"]

RUN apt-get update && \
    apt-get install -y nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
