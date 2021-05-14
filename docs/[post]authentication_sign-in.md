# [post] /authentication/sign-in

* [(200) must succeed on authenticating the user and signing a jwt token for it](#7f3e11af0a)
* [(400) must return an error when not providing the field "email" on request body](#cbc573194d)
* [(400) must return an error when not providing the field "password" on request body](#cf72e27ce1)
* [(404) must return an error when providing an "email" that is not registered for any user](#f0c7772a81)
* [(404) must return an error when providing a "password" that mismatches user's password](#0848e86812)

---

### :chicken: `(200) must succeed on authenticating the user and signing a jwt token for it` <a name="7f3e11af0a"></a>

```sh
curl -X POST \
http://localhost:52488/authentication/sign-in \
-d '{
  "email": "email@domain.com",
  "password": "abc123def!@#"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "password": "abc123def!@#"
}
```

**Response** :hatching_chick:

Status: 200

Headers: 

| Key | Value |
| :--- | :--- |
| authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiaWF0IjoxNTY4MDY2ODM5LCJleHAiOjE1Njg2NzE2MzksImlzcyI6ImNyZWF0ZS1ub2RlanMtYXBwL2F1dGhlbnRpY2F0aW9uIiwic3ViIjoiNWQ3NmNkMTczYWFiOTAzYjNkNGEwYzE4In0.oi-31tS8ZeAcwEX4Sc-yaRYHXyyt066A-EvSLbKoC24 |

Body: _empty_

### :chicken: `(400) must return an error when not providing the field "email" on request body` <a name="cbc573194d"></a>

```sh
curl -X POST \
http://localhost:52488/authentication/sign-in \
-d '{
  "password": "abc123def!@#"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "password": "abc123def!@#"
}
```

**Response** :hatching_chick:

Status: 400

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(400) must return an error when not providing the field "password" on request body` <a name="cf72e27ce1"></a>

```sh
curl -X POST \
http://localhost:52488/authentication/sign-in \
-d '{
  "email": "email@domain.com"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com"
}
```

**Response** :hatching_chick:

Status: 400

Headers: _empty_

Body: 

```
{
  "code": "SHARED_ERROR_FIELD_IS_REQUIRED",
  "field": "password",
  "message": "O campo \"password\" é mandatório."
}
```

### :chicken: `(404) must return an error when providing an "email" that is not registered for any user` <a name="f0c7772a81"></a>

```sh
curl -X POST \
http://localhost:52488/authentication/sign-in \
-d '{
  "email": "not-registered-email@domain.com",
  "password": "abc123def!@#"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "email": "not-registered-email@domain.com",
  "password": "abc123def!@#"
}
```

**Response** :hatching_chick:

Status: 404

Headers: _empty_

Body: 

```
{
  "code": "AUTHENTICATION_ERROR_USER_EMAIL_NOT_FOUND",
  "message": "Autenticação falhou pois não há nenhum usuário registrado com este email."
}
```

### :chicken: `(404) must return an error when providing a "password" that mismatches user's password` <a name="0848e86812"></a>

```sh
curl -X POST \
http://localhost:52488/authentication/sign-in \
-d '{
  "email": "email@domain.com",
  "password": "not-abc123def!@#"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "password": "not-abc123def!@#"
}
```

**Response** :hatching_chick:

Status: 404

Headers: _empty_

Body: 

```
{
  "code": "AUTHENTICATION_ERROR_USER_PASSWORD_MISMATCH",
  "message": "Autenticação falhou pois a senha fornecida não corresponde a senha do usuário."
}
```
