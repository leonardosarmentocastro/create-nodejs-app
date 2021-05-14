# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:52601/users/5d76cd21f90db03b69f60d71 \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
```

**Request** :egg:

Path: `/users/5d76cd21f90db03b69f60d71`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-09-09T22:07:29.907Z",
  "updatedAt": "2019-09-09T22:07:29.907Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d76cd21f90db03b69f60d71"
}
```

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X GET \
http://localhost:52601/users/5d76cd22f90db03b69f60d72 \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
```

**Request** :egg:

Path: `/users/5d76cd22f90db03b69f60d72`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "USERS_ERROR_USER_NOT_FOUND",
  "field": "id",
  "message": "Usuário \"5d76cd22f90db03b69f60d72\" não encontrado."
}
```
