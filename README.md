## ROADMAP

<!-- * try on backend: https://github.com/sindresorhus/got -->
1. create folders `database`
  * it will be executed on `./index.js`
  * add a Dockerfile that will create a mongodb (map volume locally)
2. add signup, signin and login
  * try to split it into a module so I can plug in wherever I want
3. add functional tests
* try this date library instead of luxon: https://github.com/iamkun/dayjs
* try on frontend (which is to come): https://github.com/sindresorhus/ky

## Working

```sh
# Running everything from "docker-compose" and taking advantage from "container name resolution":
## 1. Running database + server in one process
docker-compose up

## 2. Running database or server in separate processes
  ## 2.1. Using default values from ".env"
  docker-compose up server
  docker-compose up database

  ## 2.2. Overriding environment values are also possible (check "environments" under "docker-compose.yml")
  ### NOTE 1: It will not be possible to reach the local "database" container if you override the "MONGODB_HOST".
  ### Because, in this case, we are making advantage of docker name resolution to connect to the database, set as
  ### "database" service on "docker-compose" file.
  ### This will not work:
  ### MONGODB_HOST=127.0.0.1 docker-compose up server
  ### docker-compose up database
  PORT=3000 docker-compose up server
  docker-compose up database

## 3. Running the application locally and the server from docker-compose
### NOTE 1: Variables can be overriden by comming before the start instruction.
### NOTE 2: Since you are connecting from your machine to a "docker container", the
### docker name resolution will not be able to work, because you are outside of its network.
### You will need to override "MONGODB_HOST" to "0.0.0.0" or "127.0.0.1" to be able to connect to it.
docker-compose up database
MONGODB_HOST=0.0.0.0 MONGODB_DATABASE_NAME="db-test" npm start
```
