# [post] /authentication/sign-up

* [(200) must succeed on creating the user and signing a jwt token for it](#dfa03f69f9)

---

### :chicken: `(200) must succeed on creating the user and signing a jwt token for it` <a name="dfa03f69f9"></a>

```sh
curl -X POST \
http://localhost:52627/authentication/sign-up \
-d '{
  "email": "email@domain.com",
  "username": "username123",
  "password": "abc123def!@#"
}' \
-H 'accept-language: pt-br'
-H 'authorization: authorization-token-dev'
-H 'content-type: application/json'
```

**Request** :egg:

Path: `/authentication/sign-up`

Query parameters: _empty_

Headers: 

| Key | Value |
| :--- | :--- |
| accept-language | pt-br |
| authorization | authorization-token-dev |
| content-type | application/json |

Body: 

```
{
  "email": "email@domain.com",
  "username": "username123",
  "password": "abc123def!@#"
}
```

**Response** :hatching_chick:

Status: 200

Headers: 

| Key | Value |
| :--- | :--- |
| authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiaWF0IjoxNTY4MDY2ODUzLCJleHAiOjE1Njg2NzE2NTMsImlzcyI6ImNyZWF0ZS1ub2RlanMtYXBwL2F1dGhlbnRpY2F0aW9uIiwic3ViIjoiNWQ3NmNkMjUyZTYzMjIzYjZkZDNmNGU2In0.PZx5hbr3NfvENQQ-mnRtTOM9Q8Wqk5PcWhq5S8oiQ88 |

Body: _empty_
