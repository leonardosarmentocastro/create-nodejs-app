# [post] /users

* [(200) must return the newly created user](#be46148abf)
* [(500) must return an error when not providing an email](#a479c2529e)
* [(500) must return an error when not providing an username](#0249616b45)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return an error when providing an email that is already being used](#4b751e77e4)
* [(500) must return an error when providing an username that exceeds "24" characters](#21dd7b5207)
* [(500) must return an error when providing an username that is already being used](#dda89a6cde)

---

### :chicken: `(200) must return the newly created user` <a name="be46148abf"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "username": "username123"
}
```

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-05-19T12:17:20.814Z",
  "updatedAt": "2019-05-19T12:17:20.949Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5ce14950fefb7630d0a70960"
}
```

### :chicken: `(500) must return an error when not providing an email` <a name="a479c2529e"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "",
  "username": "username123"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "",
  "username": "username123"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "IS_REQUIRED",
  "field": "email",
  "message": "The field \"email\" is required."
}
```

### :chicken: `(500) must return an error when not providing an username` <a name="0249616b45"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "email@domain.com",
  "username": ""
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "username": ""
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "IS_REQUIRED",
  "field": "username",
  "message": "The field \"username\" is required."
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "invalid@123!!!!.com.br",
  "username": "username123"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "invalid@123!!!!.com.br",
  "username": "username123"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "EMAIL_INVALID",
  "field": "email",
  "message": "The email \"invalid@123!!!!.com.br\" is invalid."
}
```

### :chicken: `(500) must return an error when providing an email that is already being used` <a name="4b751e77e4"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "email@already-being-used.com",
  "username": "username123"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "email@already-being-used.com",
  "username": "username123"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "EMAIL_ALREADY_IN_USE",
  "field": "email",
  "message": "The email \"email@already-being-used.com\" is already in use."
}
```

### :chicken: `(500) must return an error when providing an username that exceeds "24" characters` <a name="21dd7b5207"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "email@domain.com",
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "USERNAME_TOO_LONG",
  "field": "username",
  "message": "The username \"aaaaaaaaaaaaaaaaaaaaaaaaa\" is too long (max length is 24)."
}
```

### :chicken: `(500) must return an error when providing an username that is already being used` <a name="dda89a6cde"></a>

```sh
curl -X POST \
http://localhost:55562/users \
-d '{
  "email": "email@not-being-used.com",
  "username": "already-being-used"
}' \
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| content-type | application/json |

Body: 

```
{
  "email": "email@not-being-used.com",
  "username": "already-being-used"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "USERNAME_ALREADY_IN_USE",
  "field": "username",
  "message": "The username \"already-being-used\" is already in use."
}
```
