# [delete] /users/:id

* [(200) must succeed on deleting the user, returning an empty body](#2ad51d5aa8)
* [(500) must return a translated error when searching for an user with an invalid mongo "id"](#c2363a9bad)

---

### :chicken: `(200) must succeed on deleting the user, returning an empty body` <a name="2ad51d5aa8"></a>

```sh
curl -X DELETE \
http://localhost:51196/users/5d2a2c38f1fdb692da29249b \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/5d2a2c38f1fdb692da29249b`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: _empty_

### :chicken: `(500) must return a translated error when searching for an user with an invalid mongo "id"` <a name="c2363a9bad"></a>

```sh
curl -X DELETE \
http://localhost:51196/users/123 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/123`

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
  "message": "Usuário \"123\" não encontrado."
}
```
