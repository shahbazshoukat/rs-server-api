# rs-server-api
Result square Server API. Serving Backend for both resultsquare home and admin.

## Getting Started

### Setup

##### Requirements
 Install latest node and npm packages.
- Node
- NPM

##### Clone the Repo

```bash
$ git clone https://github.com/shahbazshoukat/rs-server-api.git
$ cd <path/to/rs-server-api>
```

##### Install npm Packages

```bash
$ npm install
```

####  Start Server
##### For Local

```bash
$ node app.js
```

##### For Production/Development (with pm2)

```bash
$ pm2 start app.js
```

####  Run Unit Tests

```bash
$ npm run test
```

## Containerize

# Docker Container Name

RS Server docker container name: `rs-server-api`

### Getting Started

RS Server container is the main source of running RS API's.

### Pre-requisites

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)


### Usage


#### How to Build The Container

```shell script
docker build -t /path/to/rs-server-api:vX.X.XXX .
```

#### How to Run The Container

List the different parameters available to your container

```shell script
docker run /path/to/rs-server-api:vX.X.XXX parameters
```

One example per permutation

```shell script
docker run /path/to/rs-server-api:vX.X.XXX
```

Show how to get a shell started in your container too

```shell script
docker run /path/to/rs-server-api:vX.X.XXX bash
```

## Building container locally

**Build Container:**

```sh
cd /path/to/rs-server-api
docker build -t rs-server-api:local .
```

## Running MongoDB locally

Create local path where container will save mongodb data
```sh
mkdir -p /tmp/data
```
Run MongoDb Container with root of rs-server-api available in container
```sh
docker run --name mongo -d -p 27017:27017 -v /tmp/data:/data/db mongo:3.4.7
```

## Debug container (Bash)

```sh
docker run -it --entrypoint /bin/sh rs-server-api:local
```

## Running container locally (If container build on local machine)

**Without Environment variables file**

```sh
docker run -it \
--name rs-server-api \
-p 3000:3000 \
-e "RS_SERVER_PROJECT_ROOT=/usr/local/rs-server-api" \
rs-server-api:local

```

**With Environment variables file**

```sh
docker run -it \
 --name rs-server-api \
 -p 3000:3000 \
 --env-file config/rs-server-docker-env.list \
rs-server-api:local
```

## Running container locally (Container from dockerhub: Need DockerHub account)

**Without Environment variables file**

```sh
docker run -it \
--name rs-server-api \
-p 3000:3000 \
-e "RS_SERVER_PROJECT_ROOT=/usr/local/rs-server-api" \
resultsquare/rs-server-api:local

```

**With Environment variables file**

```sh
docker run -it \
 --name rs-server-api \
 -p 3000:3000 \
 --env-file config/rs-server-docker-env.list \
resultsquare/rs-server-api:latest
```
## Stop Docker Container

run `docker stop <container>`

### Useful Docker Commands
Build Image >> `docker build -t rs-server-api:local .`

Remove Image >> `sudo docker image rm -f <image>`

List images >> `docker images`

List all containers >> `docker ps --all`

Stop Container >> `docker stop <container>`

Remove container >> `docker rm -f <container>`

Run Container >> `docker run -d  --name rs-server-api  -p 3000:3000 resultsquare/rs-server-api:latest`

#### Tests

Tests are not available.
