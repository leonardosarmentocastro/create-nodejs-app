# [post] /authentication/sign-up

* [(200) must succeed on creating the user and signing a jwt token for it](#dfa03f69f9)

---

### :chicken: `(200) must succeed on creating the user and signing a jwt token for it` <a name="dfa03f69f9"></a>

```sh
curl -X POST \
http://localhost:51467/authentication/sign-up \
-H 'accept-language: pt-br'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-up`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| content-type | application/json |

Body: _empty_

**Response** :hatching_chick:

Status: 200

Headers: 

| Key | Value |
| :--- | :--- |
| authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiaWF0IjoxNjIwOTY4NDA1LCJleHAiOjE2MjE1NzMyMDUsImlzcyI6IkBsZW9uYXJkb3Nhcm1lbnRvY2FzdHJvL2F1dGhlbnRpY2F0aW9uIiwic3ViIjoiNjA5ZTAzZDVmNmJiZTk3OWI0NmU1ZjUwIn0.nfsl_9jpm2C1H69IJkvnhZbRlWWZFV2mVYHlBp3QolA |

Body: _empty_
