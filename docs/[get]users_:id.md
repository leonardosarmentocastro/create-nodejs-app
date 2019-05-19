# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:57735/users/5ce09e1e1f4e662108d7363e
```

**Request** :egg:

Path: `/users/5ce09e1e1f4e662108d7363e`

Query parameters: _empty_

Headers: _empty_

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-05-19T00:06:54.070Z",
  "updatedAt": "2019-05-19T00:06:54.182Z",
  "email": "email@domain.com",
  "username": "username",
  "__v": 0,
  "id": "5ce09e1e1f4e662108d7363e"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:57735/users/5ce09e1e1f4e662108d7363f
```

**Request** :egg:

Path: `/users/5ce09e1e1f4e662108d7363f`

Query parameters: _empty_

Headers: _empty_

Body: _empty_

**Response** :hatching_chick:

Status: 500

Headers: _empty_

Body: 

```
{
  "code": "USER_NOT_FOUND",
  "field": "",
  "message": "User \"5ce09e1e1f4e662108d7363f\" was not found."
}
```
