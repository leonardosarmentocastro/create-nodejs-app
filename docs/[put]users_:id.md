# [put] /users/:id

* [(200) must succeed on updating the field "email" and always return the full updated document](#1608c79266)
* [(200) must succeed on updating the field "username" and always return the full updated document](#3c0ed153b0)
* [(200) must succeed on updating "password", while not sending it on payload](#a5c24a4f3f)
* [(200) must be idempotent when updating without setting new values to fields](#ed1fa1ce58)
* [(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user](#b10df52f4e)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return an error when providing a "password" that is not strong enough](#c88cc2db6f)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)
* [(500) must return a translated error when "email" is already in use by another user](#59c6d3141d)
* [(500) must return a translated error when "username" is already in use by another user](#c0b1520597)
* [(500) must return a translated error when providing an empty "email"](#0632164d55)
* [(500) must return a translated error when providing an empty "username"](#1d4ea77b64)
* [(500) must return a translated error when providing an empty "password"](#c6e788de2b)
* [(500) must return a translated error when providing a "username" that exceeds "24" characters](#448eebd1de)

---

### :chicken: `(200) must succeed on updating the field "email" and always return the full updated document` <a name="1608c79266"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03da4e73c579b910d3f7 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03da4e73c579b910d3f7`

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
  "createdAt": "2021-05-14T05:00:10.324Z",
  "updatedAt": "2021-05-14T05:00:11.620Z",
  "email": "new-email@domain.com",
  "username": "username123",
  "id": "609e03da4e73c579b910d3f7"
}
```

### :chicken: `(200) must succeed on updating the field "username" and always return the full updated document` <a name="3c0ed153b0"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03db4e73c579b910d3f8 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03db4e73c579b910d3f8`

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
  "createdAt": "2021-05-14T05:00:10.324Z",
  "updatedAt": "2021-05-14T05:00:11.912Z",
  "email": "email@domain.com",
  "username": "new-username",
  "id": "609e03db4e73c579b910d3f8"
}
```

### :chicken: `(200) must succeed on updating "password", while not sending it on payload` <a name="a5c24a4f3f"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03db4e73c579b910d3f9 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03db4e73c579b910d3f9`

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
  "createdAt": "2021-05-14T05:00:10.324Z",
  "updatedAt": "2021-05-14T05:00:11.971Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03db4e73c579b910d3f9"
}
```

### :chicken: `(200) must be idempotent when updating without setting new values to fields` <a name="ed1fa1ce58"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03db4e73c579b910d3fa \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03db4e73c579b910d3fa`

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
  "createdAt": "2021-05-14T05:00:10.324Z",
  "updatedAt": "2021-05-14T05:00:12.499Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03db4e73c579b910d3fa"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user` <a name="b10df52f4e"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03dc4e73c579b910d3fb \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dc4e73c579b910d3fb`

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
  "createdAt": "2021-05-14T05:00:10.324Z",
  "updatedAt": "2021-05-14T05:00:13.036Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03dc4e73c579b910d3fb"
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d3fc \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d3fc`

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
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d3fd \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d3fd`

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

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d3ff \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d3ff`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "ERROR_DOCUMENT_NOT_FOUND",
  "field": "id",
  "message": "Documento para id \"609e03dd4e73c579b910d3ff\" não foi encontrado."
}
```

### :chicken: `(500) must return a translated error when "email" is already in use by another user` <a name="59c6d3141d"></a>

```sh
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d400 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d400`

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
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d402 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d402`

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
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d404 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d404`

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
curl -X PUT \
http://localhost:51501/users/609e03dd4e73c579b910d405 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03dd4e73c579b910d405`

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
curl -X PUT \
http://localhost:51501/users/609e03de4e73c579b910d406 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03de4e73c579b910d406`

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
curl -X PUT \
http://localhost:51501/users/609e03de4e73c579b910d407 \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/609e03de4e73c579b910d407`

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
