authentication
  . middleware
    - has authorization token
    - is authorization token valid
      - does token without bearer keyword matches against jwt secret
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
