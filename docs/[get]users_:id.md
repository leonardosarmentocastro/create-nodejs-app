# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:54898/users/5d14f1b88f06cae370eda09c \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d14f1b88f06cae370eda09c`

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
  "createdAt": "2019-06-27T16:41:28.029Z",
  "updatedAt": "2019-06-27T16:41:28.029Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d14f1b88f06cae370eda09c"
}
```

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X GET \
http://localhost:54898/users/5d14f1b88f06cae370eda09d \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d14f1b88f06cae370eda09d`

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
  "message": "Usuário \"5d14f1b88f06cae370eda09d\" não encontrado."
}
```
