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
http://localhost:55906/users \
-d '{
  "email": "email@domain.com",
  "username": "username123"
}' \
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
  "createdAt": "2019-06-17T14:44:00.452Z",
  "updatedAt": "2019-06-17T14:44:00.452Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d07a73056776f2e70ab77ab"
}
```

### :chicken: `(500) must return an error when not providing an email` <a name="a479c2529e"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "",
  "username": "username123"
}' \
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
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(500) must return an error when not providing an username` <a name="0249616b45"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "email@domain.com",
  "username": ""
}' \
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
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "username",
  "message": "O campo \"username\" é mandatório."
}
```

### :chicken: `(500) must return an error when providing an invalid email` <a name="02005a1fc1"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "invalid@123!!!!.com.br",
  "username": "username123"
}' \
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
  "code": "SHARED_ERROR_EMAIL_INVALID",
  "field": "email",
  "message": "O email \"invalid@123!!!!.com.br\" é inválido."
}
```

### :chicken: `(500) must return an error when providing an email that is already being used` <a name="4b751e77e4"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "email@already-being-used.com",
  "username": "username123"
}' \
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
  "code": "SHARED_ERROR_FIELD_ALREADY_IN_USE",
  "field": "email",
  "message": "Este email já está em uso."
}
```

### :chicken: `(500) must return an error when providing an username that exceeds "24" characters` <a name="21dd7b5207"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "email@domain.com",
  "username": "aaaaaaaaaaaaaaaaaaaaaaaaa"
}' \
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
  "code": "SHARED_ERROR_FIELD_IS_TOO_LONG",
  "field": "username",
  "message": "O nome de usuário \"aaaaaaaaaaaaaaaaaaaaaaaaa\" é longo demais (máximo de caracteres é undefined)."
}
```

### :chicken: `(500) must return an error when providing an username that is already being used` <a name="dda89a6cde"></a>

```sh
curl -X POST \
http://localhost:55906/users \
-d '{
  "email": "email@not-being-used.com",
  "username": "already-being-used"
}' \
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
  "code": "SHARED_ERROR_FIELD_ALREADY_IN_USE",
  "field": "username",
  "message": "Este username já está em uso."
}
```
