# [put] /users/:id

* [(200) must succeed on updating the field "email" and always return the full updated document](#1608c79266)
* [(200) must succeed on updating the field "username" and always return the full updated document](#3c0ed153b0)
* [(200) must be idempotent when updating without setting new values to fields](#ed1fa1ce58)
* [(200) The fields "id,_id,createdAt,updatedAt" must not be updatable](#f9c84d3fd9)
* [(500) must return an error if the user doesn't exists](#5c25a2eaa2)
* [(500) must return an error when providing an empty email](#9e44cc5395)
* [(500) must return an error when providing an invalid email](#02005a1fc1)
* [(500) must return an error when providing an email that is already being used](#4b751e77e4)
* [(500) must return an error when providing an empty username](#3268a8467d)
* [(500) must return an error when providing an username that exceeds "24" characters](#21dd7b5207)
* [(500) must return an error when providing an username that is already being used](#dda89a6cde)

---

### :chicken: `(200) must succeed on updating the field "email" and always return the full updated document` <a name="1608c79266"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a719c8f6052e6df854bc \
-d '{
  "email": "new-email@domain.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a719c8f6052e6df854bc`

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
  "createdAt": "2019-06-17T14:43:37.460Z",
  "updatedAt": "2019-06-17T14:43:37.629Z",
  "email": "new-email@domain.com",
  "username": "username123",
  "id": "5d07a719c8f6052e6df854bc"
}
```

### :chicken: `(200) must succeed on updating the field "username" and always return the full updated document` <a name="3c0ed153b0"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a719c8f6052e6df854bd \
-d '{
  "username": "new-username"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a719c8f6052e6df854bd`

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
  "createdAt": "2019-06-17T14:43:37.460Z",
  "updatedAt": "2019-06-17T14:43:37.664Z",
  "email": "email@domain.com",
  "username": "new-username",
  "id": "5d07a719c8f6052e6df854bd"
}
```

### :chicken: `(200) must be idempotent when updating without setting new values to fields` <a name="ed1fa1ce58"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a719c8f6052e6df854be \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a719c8f6052e6df854be`

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
  "createdAt": "2019-06-17T14:43:37.460Z",
  "updatedAt": "2019-06-17T14:43:37.688Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d07a719c8f6052e6df854be"
}
```

### :chicken: `(200) The fields "id,_id,createdAt,updatedAt" must not be updatable` <a name="f9c84d3fd9"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a719c8f6052e6df854bf \
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

Path: `/users/5d07a719c8f6052e6df854bf`

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
  "createdAt": "2019-06-17T14:43:37.460Z",
  "updatedAt": "2019-06-17T14:43:37.714Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d07a719c8f6052e6df854bf"
}
```

### :chicken: `(500) must return an error if the user doesn't exists` <a name="5c25a2eaa2"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a719c8f6052e6df854c1 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d07a719c8f6052e6df854c1`

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
  "message": "Usuário \"5d07a719c8f6052e6df854c1\" não encontrado."
}
```

### :chicken: `(500) must return an error when providing an empty email` <a name="9e44cc5395"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a71cc8f6052e6df854c2 \
-d '{
  "email": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a71cc8f6052e6df854c2`

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

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a720c8f6052e6df854c3 \
-d '{
  "email": "invalid@123!!!!.com.br"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a720c8f6052e6df854c3`

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

### :chicken: `(500) must return an error when providing an email that is already being used` <a name="4b751e77e4"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a723c8f6052e6df854c4 \
-d '{
  "email": "email@already-being-used.com"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a723c8f6052e6df854c4`

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
  "code": "SHARED_ERROR_FIELD_ALREADY_IN_USE",
  "field": "email",
  "message": "Este email já está em uso."
}
```

### :chicken: `(500) must return an error when providing an empty username` <a name="3268a8467d"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a726c8f6052e6df854c6 \
-d '{
  "username": ""
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a726c8f6052e6df854c6`

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

### :chicken: `(500) must return an error when providing an username that exceeds "24" characters` <a name="21dd7b5207"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a729c8f6052e6df854c7 \
-d '{
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a729c8f6052e6df854c7`

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
  "message": "O nome de usuário \"aaaaaaaaaaaaaaaaaaaaaaaaa\" é longo demais (máximo de caracteres é undefined)."
}
```

### :chicken: `(500) must return an error when providing an username that is already being used` <a name="dda89a6cde"></a>

```sh
curl -X PUT \
http://localhost:55873/users/5d07a72cc8f6052e6df854c8 \
-d '{
  "username": "username_being_used"
}' \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/users/5d07a72cc8f6052e6df854c8`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: 

```
{
  "username": "username_being_used"
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
