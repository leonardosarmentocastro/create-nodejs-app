# [delete] /users/:id

* [(200) must succeed on deleting the user, returning an empty body](#2ad51d5aa8)
* [(500) must return a translated error when deleting an user with an invalid mongo "id"](#074c048f2a)

---

### :chicken: `(200) must succeed on deleting the user, returning an empty body` <a name="2ad51d5aa8"></a>

```sh
curl -X DELETE \
http://localhost:51471/users/609e03d6514cce79b5f656c0 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users/609e03d6514cce79b5f656c0`

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

### :chicken: `(500) must return a translated error when deleting an user with an invalid mongo "id"` <a name="074c048f2a"></a>

```sh
curl -X DELETE \
http://localhost:51471/users/123 \
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
  "code": "ERROR_DOCUMENT_NOT_FOUND",
  "field": "id",
  "message": "Documento para id \"123\" não foi encontrado."
}
```
