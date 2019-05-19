# [get] /users/:id

* [(200) must return the user saved on database if it exists](#64277522ed)
* [(500) must return an error if the user doesn't exist](#37d1ba6bf3)

---

### :chicken: `(200) must return the user saved on database if it exists` <a name="64277522ed"></a>

```sh
curl -X GET \
http://localhost:55572/users/5ce14951e7092e30d16283f3
```

**Request** :egg:

Path: `/users/5ce14951e7092e30d16283f3`

Query parameters: _empty_

Headers: _empty_

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: _empty_

Body: 

```
{
  "createdAt": "2019-05-19T12:17:21.626Z",
  "updatedAt": "2019-05-19T12:17:21.741Z",
  "email": "email@domain.com",
  "username": "username",
  "id": "5ce14951e7092e30d16283f3"
}
```

### :chicken: `(500) must return an error if the user doesn't exist` <a name="37d1ba6bf3"></a>

```sh
curl -X GET \
http://localhost:55572/users/5ce14951e7092e30d16283f4
```

**Request** :egg:

Path: `/users/5ce14951e7092e30d16283f4`

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
  "message": "User \"5ce14951e7092e30d16283f4\" was not found."
}
```
