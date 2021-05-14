# [get] /users

* [(200) must return paginated content if there are users from database](#425b501c40)
* [(200) must return an empty array if there are no users on database](#fa7384a410)

---

### :chicken: `(200) must return paginated content if there are users from database` <a name="425b501c40"></a>

```sh
curl -X GET \
http://localhost:51476/users?l=2&p=2 \
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
      "createdAt": "2021-05-14T05:00:06.847Z",
      "updatedAt": "2021-05-14T05:00:06.847Z",
      "email": "user3_email@domain.com",
      "username": "user3_username123",
      "id": "609e03d75f69ca79b6984cf7"
    },
    {
      "createdAt": "2021-05-14T05:00:06.847Z",
      "updatedAt": "2021-05-14T05:00:06.847Z",
      "email": "user4_email@domain.com",
      "username": "user4_username123",
      "id": "609e03d75f69ca79b6984cf8"
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
http://localhost:51476/users \
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
