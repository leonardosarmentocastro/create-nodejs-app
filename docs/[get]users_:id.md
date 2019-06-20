# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:60270/users/5d0b7c3e0dc50b99beb5d78f \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d0b7c3e0dc50b99beb5d78f`

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
  "createdAt": "2019-06-20T12:29:50.518Z",
  "updatedAt": "2019-06-20T12:29:50.518Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d0b7c3e0dc50b99beb5d78f"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:60270/users/5d0b7c3e0dc50b99beb5d790 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d0b7c3e0dc50b99beb5d790`

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
  "message": "Usuário \"5d0b7c3e0dc50b99beb5d790\" não encontrado."
}
```
