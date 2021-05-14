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
http://localhost:51459/authentication/sign-in \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: 

| Key | Value |
| :--- | :--- |
| authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiaWF0IjoxNjIwOTY4NDA0LCJleHAiOjE2MjE1NzMyMDQsImlzcyI6IkBsZW9uYXJkb3Nhcm1lbnRvY2FzdHJvL2F1dGhlbnRpY2F0aW9uIiwic3ViIjoiNjA5ZTAzZDQyNjU0YmI3OWIyYzZkMmQ1In0.pyW8e3Z3XPf4KC-EHj6mXgUEF5r2qZTaQYVVoXZYoqk |

Body: _empty_

### :chicken: `(400) must return an error when not providing the field "email" on request body` <a name="cbc573194d"></a>

```sh
curl -X POST \
http://localhost:51459/authentication/sign-in \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 400

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_REQUIRED",
  "field": "email",
  "message": "O campo \"email\" é mandatório."
}
```

### :chicken: `(400) must return an error when not providing the field "password" on request body` <a name="cf72e27ce1"></a>

```sh
curl -X POST \
http://localhost:51459/authentication/sign-in \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 400

Headers: _empty_

Body: 

```
{
  "code": "VALIDATOR_ERROR_FIELD_IS_REQUIRED",
  "field": "password",
  "message": "O campo \"password\" é mandatório."
}
```

### :chicken: `(404) must return an error when providing an "email" that is not registered for any user` <a name="f0c7772a81"></a>

```sh
curl -X POST \
http://localhost:51459/authentication/sign-in \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 404

Headers: _empty_

Body: 

```
{
  "code": "AUTHENTICATION_ERROR_EMAIL_NOT_FOUND",
  "message": "Autenticação falhou pois não há nenhum usuário registrado com este email."
}
```

### :chicken: `(404) must return an error when providing a "password" that mismatches user's password` <a name="0848e86812"></a>

```sh
curl -X POST \
http://localhost:51459/authentication/sign-in \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-in`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 404

Headers: _empty_

Body: 

```
{
  "code": "AUTHENTICATION_ERROR_PASSWORD_MISMATCH",
  "message": "Autenticação falhou pois a senha fornecida não corresponde a senha do usuário."
}
```
