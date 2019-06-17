# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:55915/users/5d07a73145f6072e718d32f4 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d07a73145f6072e718d32f4`

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
  "createdAt": "2019-06-17T14:44:01.316Z",
  "updatedAt": "2019-06-17T14:44:01.316Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d07a73145f6072e718d32f4"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:55915/users/5d07a73145f6072e718d32f5 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d07a73145f6072e718d32f5`

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
  "message": "Usuário \"5d07a73145f6072e718d32f5\" não encontrado."
}
```
