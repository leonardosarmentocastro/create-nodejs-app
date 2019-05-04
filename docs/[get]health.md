# [get] /health

* [(200) must return the application healthy check status](#f8aae7dace)

---

### :chicken: `(200) must return the application healthy check status` <a name="f8aae7dace"></a>

```sh
curl -X GET \
http://localhost:8081/health
```

**Request** :egg:

Path: `/health`

Query parameters: _empty_

Headers: _empty_

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
