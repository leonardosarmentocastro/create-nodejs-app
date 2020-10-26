# poc_nodejs_microservice

Using [Node.js](https://nodejs.org/en/) to develop micro-services.

### ROADMAP

- [] remove "authentication" module
- [] remove unused CI providers
  - [] gitlab
  - [] travis
- [] deploy to heroku (write a how-to)
  - [] write github action
  - [] set github secrets
  - [] create heroku account with "leonardo.castro@redealumni.com"
- [] code coverage (nyc_output)
- [] add mysql ("mongodb" must co-exist)
  - [] docker-compose
    - [] add "database_mysql" service
    - [] rename "database" to "database_mongodb"
  - [] create folders "/src/database/mysql" and "/src/database/mongodb"
  - [] create modules "mysql/users" and "mongodb/users"
    - [] update resolver routes (e.g. to `localhost:3000/mongodb/users` instead of `localhost:3000/users`)
  - [] probably there is a token (as a github secret) which CI yml uses
- [] fetch some data from `melhor_escola` new dashboard
  - [] unit test it
  - [] functional test it (and earn "docs/")

## Developing locally

There are two main dependencies: [Node.js](https://github.com/nvm-sh/nvm) and [Docker](https://docs.docker.com/get-docker/).

Once both are installed, land on the project folder and install it's packages:

```sh
cd ~/poc_nodejs_microservice
npm install
```

Now, it's simply as that:

> Database will be started usingand docker-compose, environment variables will be loaded
> according to `.env.example`/`.env`, and the server will be running locally in live-reload in your terminal.

```sh
npm start
```

## Running locally

Check out below another ways to run the micro-service locally, only using Docker:

```sh
# Running everything from "docker-compose" and taking advantage from "container name resolution":
## 1. Running database + server in one process
docker-compose up

## 2. Running database or server in separate processes
  ## 2.1. Using default values from ".env"
  docker-compose up server
  docker-compose up database

  ## 2.2. Overriding environment values are also possible (check "environments" under "docker-compose.yml")
  ### NOTE: Caution when overriding "MONGODB_HOST" to reach the local "database" container.
  ### In docker-compose we are making advantage of docker name resolution to connect to the database, set as
  ### "database" service on "docker-compose" file.
  ### This will not work:
  ### MONGODB_HOST=127.0.0.1 docker-compose up server
  ### This will work:
  ### MONGODB_HOST=database docker-compose up server
  PORT=3000 MONGODB_CONNECTION_STRING=mongodb://database/db-prod docker-compose up server
  docker-compose up database

## 3. Running the application locally and the server from docker-compose
### NOTE 1: Variables can be overriden by comming before the start instruction.
### NOTE 2: Since you are connecting from your machine to a "docker container", the
### docker name resolution will not be able to work, because you are outside of its network.
### You will need to override "MONGODB_HOST" to "0.0.0.0" or "127.0.0.1" to be able to connect to it.
docker-compose up database
MONGODB_HOST=0.0.0.0 MONGODB_DATABASE_NAME="db-test" npm start
```

## Useful links

How do I correctly clone a JavaScript object?
https://stackoverflow.com/a/10869248/6655011

Knex cheatsheet
https://devhints.io/knex
