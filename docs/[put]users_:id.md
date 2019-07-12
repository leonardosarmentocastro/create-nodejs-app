# [put] /users/:id

* [(200) must succeed on updating the field "email" and always return the full updated document](#1608c79266)
* [(200) must succeed on updating the field "username" and always return the full updated document](#3c0ed153b0)
* [(200) must be idempotent when updating without setting new values to fields](#ed1fa1ce58)
* [(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user](#b10df52f4e)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return a translated error when "email" is already in use by another user](#59c6d3141d)
* [(500) must return a translated error when "username" is already in use by another user](#c0b1520597)
* [(500) must return a translated error when providing an empty "email"](#0632164d55)
* [(500) must return a translated error when providing an empty "username"](#1d4ea77b64)
* [(500) must return a translated error when providing a "username" that exceeds "24" characters](#448eebd1de)

---

### :chicken: `(200) must succeed on updating the field "email" and always return the full updated document` <a name="1608c79266"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b436 \
-d '{
  "email": "new-email@domain.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b436`

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
  "createdAt": "2019-06-28T16:59:49.646Z",
  "updatedAt": "2019-06-28T16:59:49.818Z",
  "email": "new-email@domain.com",
  "username": "username123",
  "id": "5d16478589911a0e16d8b436"
}
```

### :chicken: `(200) must succeed on updating the field "username" and always return the full updated document` <a name="3c0ed153b0"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b437 \
-d '{
  "username": "new-username"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b437`

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
  "createdAt": "2019-06-28T16:59:49.646Z",
  "updatedAt": "2019-06-28T16:59:49.849Z",
  "email": "email@domain.com",
  "username": "new-username",
  "id": "5d16478589911a0e16d8b437"
}
```

### :chicken: `(200) must be idempotent when updating without setting new values to fields` <a name="ed1fa1ce58"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b438 \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b438`

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
  "createdAt": "2019-06-28T16:59:49.646Z",
  "updatedAt": "2019-06-28T16:59:49.869Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d16478589911a0e16d8b438"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must be ignored when creating or updating an user` <a name="b10df52f4e"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b439 \
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

Path: `/users/5d16478589911a0e16d8b439`

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
  "createdAt": "2019-06-28T16:59:49.646Z",
  "updatedAt": "2019-06-28T16:59:49.890Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d16478589911a0e16d8b439"
}
```

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b43b \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b43b`

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
  "message": "Usuário \"5d16478589911a0e16d8b43b\" não encontrado."
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b43c \
-d '{
  "email": "invalid@123!!!!.com.br"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b43c`

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

### :chicken: `(500) must return a translated error when "email" is already in use by another user` <a name="59c6d3141d"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b43d \
-d '{
  "email": "email@already-being-used.com",
  "username": "user2_username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b43d`

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
http://localhost:49174/users/5d16478589911a0e16d8b43f \
-d '{
  "email": "user2_email@domain.com",
  "username": "already-being-used"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b43f`

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

### :chicken: `(500) must return a translated error when providing an empty "email"` <a name="0632164d55"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478589911a0e16d8b441 \
-d '{
  "email": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b441`

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
http://localhost:49174/users/5d16478589911a0e16d8b442 \
-d '{
  "username": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478589911a0e16d8b442`

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

### :chicken: `(500) must return a translated error when providing a "username" that exceeds "24" characters` <a name="448eebd1de"></a>

```sh
curl -X PUT \
http://localhost:49174/users/5d16478689911a0e16d8b443 \
-d '{
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d16478689911a0e16d8b443`

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