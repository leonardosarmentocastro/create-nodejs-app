# create-nodejs-app

## ROADMAP

http://userguide.icu-project.org/formatparse/messages
https://messageformat.github.io/messageformat/page-build#toc3__anchor
https://github.com/nodeca/js-yaml#safeload-string---options-
https://yaml-multiline.info/

0. documentation
  - create a decent README.md explaining CI/architecture decisions step by step (jeez, so many things to configure)
  - record gifs with "Gifox": https://gifox.io/
1. wizard
  - Prompt user to select witch kind of tempalte he wants: https://github.com/enquirer/enquirer
3. modules to add
  - add signup, signin and login(try to split it into a module so I can plug in wherever I want)
4. try libs
  - try on frontend (which is to come): https://github.com/sindresorhus/ky
5. create fronte-end consumer application


## Templates

1. simple:
  * production ready dockerfile
  * support internationalization
  * example end points with functional tests/doc generation
    * [get] /health returning static dumb data (like "{ status: 'ok' }")
    * [get] /users/:id using fixtures
    * [post] /users using fixtures
  * deploy to heroku using travis.ci/gitlab ready
2. standard:
  * production ready dockerfile
  * development ready docker-compose to tear up database/server
  * database integration with retry strategy on code
  * support to environment variables via .env
  * support internationalization
  * example endpoints
    * [get] /health return server/database status (mongoose.connection.readyState)
    * [get] /users/:id using database
    * [post] /users using database
  * deploy to heroku using travis.ci/gitlab ready
3. prime
  * production ready dockerfile
  * development ready docker-compose to tear up database/server
  * database integration with retry strategy on code
  * support to environment variables via .env
  * support internationalization
  * example endpoints
    * [get] /health return server/database status
    * users module
      * [me] /me
    * authentication module
      * [post] /sign-up
      * [post] /sign-in
      * [post] /sign-out
  * authorization middleware
  * deploy to heroku using travis.ci/gitlab ready

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

## Libs to use

- sending emails
https://github.com/forwardemail/email-templates

- Creating CLIs with Ink, React and a bit of magic
https://vadimdemedes.com/posts/creating-clis-with-ink-react-and-a-bit-of-magic
