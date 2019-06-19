# [get] /health

* [(200) must return the application healthy check status](#f8aae7dace)

---

### :chicken: `(200) must return the application healthy check status` <a name="f8aae7dace"></a>

```sh
curl -X GET \
http://localhost:57634/health \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/health`

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
  "application": "up"
}
```
