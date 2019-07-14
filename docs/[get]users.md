# [get] /users

* [(200) must return paginated content if there are users from database](#425b501c40)
* [(200) must return an empty array if there are no users on database](#fa7384a410)

---

### :chicken: `(200) must return paginated content if there are users from database` <a name="425b501c40"></a>

```sh
curl -X GET \
http://localhost:51182/users?l=2&p=2 \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users`

Query parameters: 

| Key | Value |
| :--- | :--- |
| l | 2 |
| p | 2 |

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
  "docs": [
    {
      "createdAt": "2019-07-13T19:08:38.952Z",
      "updatedAt": "2019-07-13T19:08:38.952Z",
      "email": "user3_email@domain.com",
      "username": "user3_username123",
      "id": "5d2a2c375e5a5b92c91b48b6"
    },
    {
      "createdAt": "2019-07-13T19:08:38.952Z",
      "updatedAt": "2019-07-13T19:08:38.952Z",
      "email": "user4_email@domain.com",
      "username": "user4_username123",
      "id": "5d2a2c375e5a5b92c91b48b7"
    }
  ],
  "hasNextPage": false,
  "hasPreviousPage": true,
  "nextPage": null,
  "previousPage": 1,
  "totalCount": 4,
  "totalPages": 2
}
```

### :chicken: `(200) must return an empty array if there are no users on database` <a name="fa7384a410"></a>

```sh
curl -X GET \
http://localhost:51182/users \
-H 'accept-language: pt-br'
```

**Request** :egg:

Path: `/users`

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
  "docs": [],
  "hasNextPage": false,
  "hasPreviousPage": false,
  "nextPage": null,
  "previousPage": null,
  "totalCount": 0,
  "totalPages": 0
}
```
