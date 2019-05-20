# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:62515/users/5ce2e3ae78d83365b185cd81 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5ce2e3ae78d83365b185cd81`

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
  "createdAt": "2019-05-20T17:28:14.323Z",
  "updatedAt": "2019-05-20T17:28:14.518Z",
  "email": "email@domain.com",
  "username": "username",
  "id": "5ce2e3ae78d83365b185cd81"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:62515/users/5ce2e3ae78d83365b185cd82 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5ce2e3ae78d83365b185cd82`

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
  "field": "",
  "message": "Usuário \"5ce2e3ae78d83365b185cd82\" não encontrado."
}
```
