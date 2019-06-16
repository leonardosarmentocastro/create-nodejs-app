# [put] /users/:id

* [(200) must succeed on updating the field "email" and always return the full updated document](#1608c79266)
* [(200) must succeed on updating the field "username" and always return the full updated document](#3c0ed153b0)
* [(200) must be idempotent when updating without setting new values to fields](#ed1fa1ce58)
* [(200) The fields "id,_id,createdAt,updatedAt" must not be updatable](#f9c84d3fd9)
* [(500) must return an error if the user doesn't exists](#5c25a2eaa2)
* [(500) must return an error when providing an empty email](#9e44cc5395)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return an error when providing an email that is already being used](#4b751e77e4)

---

### :chicken: `(200) must succeed on updating the field "email" and always return the full updated document` <a name="1608c79266"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2476af7c2770bf5d27b \
-d '{
  "email": "new-email@domain.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c2476af7c2770bf5d27b`

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
  "createdAt": "2019-06-16T22:27:19.474Z",
  "updatedAt": "2019-06-16T22:27:19.653Z",
  "email": "new-email@domain.com",
  "username": "username123",
  "id": "5d06c2476af7c2770bf5d27b"
}
```

### :chicken: `(200) must succeed on updating the field "username" and always return the full updated document` <a name="3c0ed153b0"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2476af7c2770bf5d27c \
-d '{
  "username": "new-username"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c2476af7c2770bf5d27c`

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
  "createdAt": "2019-06-16T22:27:19.474Z",
  "updatedAt": "2019-06-16T22:27:19.684Z",
  "email": "email@domain.com",
  "username": "new-username",
  "id": "5d06c2476af7c2770bf5d27c"
}
```

### :chicken: `(200) must be idempotent when updating without setting new values to fields` <a name="ed1fa1ce58"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2476af7c2770bf5d27d \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c2476af7c2770bf5d27d`

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
  "createdAt": "2019-06-16T22:27:19.474Z",
  "updatedAt": "2019-06-16T22:27:19.705Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d06c2476af7c2770bf5d27d"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must not be updatable` <a name="f9c84d3fd9"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2476af7c2770bf5d27e \
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

Path: `/users/5d06c2476af7c2770bf5d27e`

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
  "createdAt": "2019-06-16T22:27:19.474Z",
  "updatedAt": "2019-06-16T22:27:19.730Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d06c2476af7c2770bf5d27e"
}
```

### :chicken: `(500) must return an error if the user doesn't exists` <a name="5c25a2eaa2"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2476af7c2770bf5d280 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d06c2476af7c2770bf5d280`

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
  "message": "Usuário \"5d06c2476af7c2770bf5d280\" não encontrado."
}
```

### :chicken: `(500) must return an error when providing an empty email` <a name="9e44cc5395"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c24a6af7c2770bf5d281 \
-d '{
  "email": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c24a6af7c2770bf5d281`

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
  "code": "USERS_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c24e6af7c2770bf5d282 \
-d '{
  "email": "invalid@123!!!!.com.br"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c24e6af7c2770bf5d282`

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
  "code": "USERS_ERROR_EMAIL_INVALID",
  "field": "email",
  "message": "O email \"invalid@123!!!!.com.br\" é inválido."
}
```

### :chicken: `(500) must return an error when providing an email that is already being used` <a name="4b751e77e4"></a>

```sh
curl -X PUT \
http://localhost:52873/users/5d06c2516af7c2770bf5d283 \
-d '{
  "email": "email@already-being-used.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d06c2516af7c2770bf5d283`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "email": "email@already-being-used.com"
}
```

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "USERS_ERROR_FIELD_ALREADY_IN_USE",
  "field": "email",
  "message": "Este email já está em uso."
}
```
