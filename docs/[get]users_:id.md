# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:49201/users/5d164787ac66170e1866d0bb \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d164787ac66170e1866d0bb`

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
  "createdAt": "2019-06-28T16:59:51.421Z",
  "updatedAt": "2019-06-28T16:59:51.421Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d164787ac66170e1866d0bb"
}
```

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X GET \
http://localhost:49201/users/5d164787ac66170e1866d0bc \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d164787ac66170e1866d0bc`

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
  "message": "Usuário \"5d164787ac66170e1866d0bc\" não encontrado."
}
```
