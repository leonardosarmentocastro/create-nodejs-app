# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:57781/users/5d0a3c368e48876b827b33e0 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d0a3c368e48876b827b33e0`

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
  "createdAt": "2019-06-19T13:44:22.273Z",
  "updatedAt": "2019-06-19T13:44:22.273Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d0a3c368e48876b827b33e0"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:57781/users/5d0a3c368e48876b827b33e1 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d0a3c368e48876b827b33e1`

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
  "message": "Usuário \"5d0a3c368e48876b827b33e1\" não encontrado."
}
```
