authentication
  . middleware (verificar jwt)
    - is authorization token valid
      - is not empty
      - does token without bearer keyword matches against jwt secret
        * "Bearer" is the encryption strategy
      - is expired
  . resolvers
    - sign-in
    - sign-up
      * v1 (validate, transform, persist, authorize)
      - validate: ...
      - transform: encrypt password and store it as private field
      - persist: ...
      - authorize: create/serve authorization header
      * v2 (validate/authorize):
      1. validate/save user
        - validation: do it on model? don't think so, authorization must be uncoupled from "user" model;
        - save: encrypt password, save it as private field
      2. create/serve authorization header
        - as shrinked as possible


jwt
  exp (expiration time): ISOString
  iss (issuer): CREATE_NODEJS_APP/AUTHENTICATION
  iat (issued at): Number
  sub (subject): { id: ObjectId }

**** to sign
jwt
  expiresIn (env/AUTHENTICATION_TOKEN_EXPIRES_IN): 7d
  issuer: CREATE_NODEJS_APP/AUTHENTICATION
  subject: { id: ObjectId }


