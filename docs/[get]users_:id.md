# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:54653/users/5d06c256e611f9772a96736b \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d06c256e611f9772a96736b`

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
  "createdAt": "2019-06-16T22:27:33.947Z",
  "updatedAt": "2019-06-16T22:27:33.947Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "5d06c256e611f9772a96736b"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:54653/users/5d06c256e611f9772a96736c \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d06c256e611f9772a96736c`

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
  "message": "Usuário \"5d06c256e611f9772a96736c\" não encontrado."
}
```
