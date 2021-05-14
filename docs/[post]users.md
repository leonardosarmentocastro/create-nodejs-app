# [post] /users

* [(200) must succeed on creating the user and return the newly created doc](#1ebdbf6888)
* [(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user](#b10df52f4e)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return an error when providing a "password" that is not strong enough](#c88cc2db6f)
* [(500) must return a translated error when "email" is already in use by another user](#59c6d3141d)
* [(500) must return a translated error when "username" is already in use by another user](#c0b1520597)
* [(500) must return a translated error when providing an empty "email"](#0632164d55)
* [(500) must return a translated error when providing an empty "username"](#1d4ea77b64)
* [(500) must return a translated error when providing an empty "password"](#c6e788de2b)
* [(500) must return a translated error when providing a "username" that exceeds "24" characters](#448eebd1de)

---

### :chicken: `(200) must succeed on creating the user and return the newly created doc` <a name="1ebdbf6888"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2021-05-14T05:00:09.105Z",
  "updatedAt": "2021-05-14T05:00:09.105Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03d9408fdb79b84266be"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user` <a name="b10df52f4e"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2021-05-14T05:00:09.105Z",
  "updatedAt": "2021-05-14T05:00:09.105Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03d9408fdb79b84266bf"
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_EMAIL_INVALID",
  "field": "email",
  "message": "O email \"invalid@123!!!!.com.br\" é inválido."
}
```

### :chicken: `(500) must return an error when providing a "password" that is not strong enough` <a name="c88cc2db6f"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "analysis": {
    "feedback": {
      "warning": "This is a top-10 common password",
      "suggestions": [
        "Add another word or two. Uncommon words are better."
      ]
    },
    "score": 0
  },
  "code": "VALIDATOR_ERROR_PASSWORD_NOT_STRONG",
  "field": "password",
  "message": "Senha não é forte o bastante."
}
```

### :chicken: `(500) must return a translated error when "email" is already in use by another user` <a name="59c6d3141d"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_ALREADY_IN_USE",
  "field": "email",
  "message": "Este \"email\" já está em uso."
}
```

### :chicken: `(500) must return a translated error when "username" is already in use by another user` <a name="c0b1520597"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_ALREADY_IN_USE",
  "field": "username",
  "message": "Este \"username\" já está em uso."
}
```

### :chicken: `(500) must return a translated error when providing an empty "email"` <a name="0632164d55"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(500) must return a translated error when providing an empty "username"` <a name="1d4ea77b64"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_REQUIRED",
  "field": "username",
  "message": "O campo \"username\" é mandatório."
}
```

### :chicken: `(500) must return a translated error when providing an empty "password"` <a name="c6e788de2b"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_REQUIRED",
  "field": "password",
  "message": "O campo \"password\" é mandatório."
}
```

### :chicken: `(500) must return a translated error when providing a "username" that exceeds "24" characters` <a name="448eebd1de"></a>

```sh
curl -X POST \
http://localhost:51488/users \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_TOO_LONG",
  "field": "username",
  "maxLength": 24,
  "message": "O campo \"username\" é longo demais (máximo de caracteres é 24)."
}
```
