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

## Templates

1. simple:
  * production ready dockerfile
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
    * [get] /health return server/database status
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

## Validator idea

It could be written as that:

```js
const isValueTooLong = {
  code: 'VALUE_TOO_LONG',
  field: 'value',
  message: 'The provided "value" has more than 10 characters.',
  validator: (value) => value > 10,
};

const isValueTooShort = {
  code: 'VALUE_TOO_SHORT',
  field: 'value',
  message: 'The provided "value" has less than 10 characters.',
  validator: (value) => value < 10,
};

const validate = (value) => [
    isValueTooLong,
    isValueTooShort
  ].reduce((err, constraint, i, array) => {
    if (err) return err;

    const { validator, ...error } = constraint;
    const isValid = !validator(value);
    return isValid ? null : error;
  }, null);

console.log('## validate(5):', validate(5));
console.log('## validate(15):', validate(15));
```

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

## Reference

How do I correctly clone a JavaScript object?
https://stackoverflow.com/a/10869248/6655011