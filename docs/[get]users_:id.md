# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:56196/users/5ce31574107bd32a6e82d91a \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5ce31574107bd32a6e82d91a`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-05-20T21:00:35.993Z",
  "updatedAt": "2019-05-20T21:00:35.993Z",
  "email": "email@domain.com",
  "username": "username",
  "id": "5ce31574107bd32a6e82d91a"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:56196/users/5ce31574107bd32a6e82d91b \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5ce31574107bd32a6e82d91b`

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
  "message": "Usuário \"5ce31574107bd32a6e82d91b\" não encontrado."
}
```
