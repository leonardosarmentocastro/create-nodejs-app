# [put] /users/:id

* [(200) must succeed on updating the field "email" and always return the full updated document](#1608c79266)
* [(200) must succeed on updating the field "username" and always return the full updated document](#3c0ed153b0)
* [(200) must be idempotent when updating without setting new values to fields](#ed1fa1ce58)
* [(200) The fields "id,_id,createdAt,updatedAt" must not be updatable](#f9c84d3fd9)
* [(500) must return an error if the user doesn't exists](#5c25a2eaa2)
* [(500) must return a translated error when providing an empty "email"](#0632164d55)
* [(500) must return a translated error when providing an empty "username"](#1d4ea77b64)
* [(500) must return a translated error when "email" is already in use by another user](#59c6d3141d)
* [(500) must return a translated error when "username" is already in use by another user](#c0b1520597)
* [(500) must return a translated error when providing a "username" that exceeds "24" characters](#448eebd1de)
* [(500) must return an error when providing an invalid email](#02005a1fc1)

---

### :chicken: `(200) must succeed on updating the field "email" and always return the full updated document` <a name="1608c79266"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c1eb5a2726b65c0bb00 \
-d '{
  "email": "new-email@domain.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c1eb5a2726b65c0bb00`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": "new-email@domain.com"
}
```

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-06-19T13:43:58.247Z",
  "updatedAt": "2019-06-19T13:43:58.407Z",
  "email": "new-email@domain.com",
  "username": "username123",
  "id": "5d0a3c1eb5a2726b65c0bb00"
}
```

### :chicken: `(200) must succeed on updating the field "username" and always return the full updated document` <a name="3c0ed153b0"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c1eb5a2726b65c0bb01 \
-d '{
  "username": "new-username"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c1eb5a2726b65c0bb01`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "username": "new-username"
}
```

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-06-19T13:43:58.247Z",
  "updatedAt": "2019-06-19T13:43:58.438Z",
  "email": "email@domain.com",
  "username": "new-username",
  "id": "5d0a3c1eb5a2726b65c0bb01"
}
```

### :chicken: `(200) must be idempotent when updating without setting new values to fields` <a name="ed1fa1ce58"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c1eb5a2726b65c0bb02 \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c1eb5a2726b65c0bb02`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
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
  "createdAt": "2019-06-19T13:43:58.247Z",
  "updatedAt": "2019-06-19T13:43:58.466Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d0a3c1eb5a2726b65c0bb02"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must not be updatable` <a name="f9c84d3fd9"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c1eb5a2726b65c0bb03 \
-d '{
  "id": "value",
  "_id": "value",
  "createdAt": "value",
  "updatedAt": "value"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c1eb5a2726b65c0bb03`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "id": "value",
  "_id": "value",
  "createdAt": "value",
  "updatedAt": "value"
}
```

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-06-19T13:43:58.247Z",
  "updatedAt": "2019-06-19T13:43:58.490Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d0a3c1eb5a2726b65c0bb03"
}
```

### :chicken: `(500) must return an error if the user doesn't exists` <a name="5c25a2eaa2"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c1eb5a2726b65c0bb05 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d0a3c1eb5a2726b65c0bb05`

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
  "code": "USERS_ERROR_USER_NOT_FOUND",
  "field": "id",
  "message": "Usuário \"5d0a3c1eb5a2726b65c0bb05\" não encontrado."
}
```

### :chicken: `(500) must return a translated error when providing an empty "email"` <a name="0632164d55"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c21b5a2726b65c0bb06 \
-d '{
  "email": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c21b5a2726b65c0bb06`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": ""
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(500) must return a translated error when providing an empty "username"` <a name="1d4ea77b64"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c24b5a2726b65c0bb07 \
-d '{
  "username": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c24b5a2726b65c0bb07`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "username": ""
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "username",
  "message": "O campo \"username\" é mandatório."
}
```

### :chicken: `(500) must return a translated error when "email" is already in use by another user` <a name="59c6d3141d"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c27b5a2726b65c0bb08 \
-d '{
  "email": "email@already-being-used.com",
  "username": "user2_username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c27b5a2726b65c0bb08`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": "email@already-being-used.com",
  "username": "user2_username123"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_ALREADY_IN_USE",
  "field": "email",
  "message": "Este email já está em uso."
}
```

### :chicken: `(500) must return a translated error when "username" is already in use by another user` <a name="c0b1520597"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c2bb5a2726b65c0bb0a \
-d '{
  "email": "user2_email@domain.com",
  "username": "already-being-used"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c2bb5a2726b65c0bb0a`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": "user2_email@domain.com",
  "username": "already-being-used"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_ALREADY_IN_USE",
  "field": "username",
  "message": "Este username já está em uso."
}
```

### :chicken: `(500) must return a translated error when providing a "username" that exceeds "24" characters` <a name="448eebd1de"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c2eb5a2726b65c0bb0c \
-d '{
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c2eb5a2726b65c0bb0c`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_IS_TOO_LONG",
  "field": "username",
  "maxLength": 24,
  "message": "O nome de usuário \"aaaaaaaaaaaaaaaaaaaaaaaaa\" é longo demais (máximo de caracteres é 24)."
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X PUT \
http://localhost:57641/users/5d0a3c31b5a2726b65c0bb0d \
-d '{
  "email": "invalid@123!!!!.com.br"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d0a3c31b5a2726b65c0bb0d`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": "invalid@123!!!!.com.br"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_EMAIL_INVALID",
  "field": "email",
  "message": "O email \"invalid@123!!!!.com.br\" é inválido."
}
```
