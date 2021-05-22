FROM node:14.16.0-alpine

WORKDIR /usr/local/

USER root

########################################
# Installing Dependencies
########################################

RUN apk add --no-cache \
    nodejs \
    npm \
    python \
    g++ \
    git \
    make


########################################
# Create Code Direcotry
########################################

RUN mkdir -p /usr/local/mcc-control-server

########################################
# Coping Code
########################################

COPY ./ /usr/local/rs-server-api
WORKDIR /usr/local/rs-server-api

RUN npm config set unsafe-perm true
########################################
# Install pm2 and setup the repo
########################################

RUN npm install && npm install -g pm2

########################################
# Expose Port
########################################

EXPOSE 443

CMD ["pm2-docker", "app.js", "--no-auto-exit"]
