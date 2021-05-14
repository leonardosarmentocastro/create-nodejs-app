# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return a translated error if the user was not found](#bdaf8f2098)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:51483/users/609e03d8637ab579b78640f5 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/609e03d8637ab579b78640f5`

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
  "createdAt": "2021-05-14T05:00:07.989Z",
  "updatedAt": "2021-05-14T05:00:07.989Z",
  "email": "email@domain.com",
  "username": "username123",
  "id": "609e03d8637ab579b78640f5"
}
```

### :chicken: `(500) must return a translated error if the user was not found` <a name="bdaf8f2098"></a>

```sh
curl -X GET \
http://localhost:51483/users/609e03d8637ab579b78640f6 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/609e03d8637ab579b78640f6`

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
  "code": "ERROR_DOCUMENT_NOT_FOUND",
  "field": "id",
  "message": "Documento para id \"609e03d8637ab579b78640f6\" não foi encontrado."
}
```
