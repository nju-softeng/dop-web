FROM node:16-slim

WORKDIR /root
COPY ["package.json", "package-lock.json", "yarn.lock", "rewire-scss.js", "config-overrides.js", "./"]
COPY ["src", "./src"]
COPY ["public", "./public"]

RUN apt-get update && \
    apt-get install -y nginx && \
    yarn install && \
    yarn build

WORKDIR /var/www/html
RUN cp -r /root/build/* /var/www/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
