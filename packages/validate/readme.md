# validate

validate constraints (specially) in mongoose models

e.g. for mongoose models:

```js
// model.js
const mongoose = require('mongoose');
const { validate, isRequiredValidator, isTooLongValidator } = require('@leonardosarmentocastro/validate');

// define your schema
const schema = new mongoose.Schema({
  email: String,
  username: String,
});

// set your validations
schema.post('validate', async (userDoc, next) => {
  const constraints = [
    ...['username'].map(field => isRequiredValidator(field)),
    isTooLongValidator('username', USERNAME_MAX_LENGTH),
  ];
  const error = await validate(constraints, userDoc);

  return next(error);
});

// use your model for crud operations
exports.UsersModel = mongoose.model('User', schema);
```

```js
// create.js
const { translate } = require('@leonardosarmentocastro/i18n');
const UsersModel = require('./model');

const userDoc = new UsersModel({ email: '', username: 'leonardo' });
try {
  const savedUser = await userDoc.save();
  const transformedUser = userDoc.toObject();

  return transformedUser;
} catch(err) {
  const transformedUser = userDoc.toObject();
  const error = translate.error(err, 'pt-br', transformedUser);

  // returns:
  // {
  //   code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
  //   message: 'O campo "{field}" é mandatório.',
  // }
  return error;
}
```

### validators

### `isAlreadyInUseValidator = (field = '') => (doc = {})`


Validate wheter a field is already present in some registry for this model.
E.g. checks if user1.email ("banana@email.com") is already being used by any user.

Translation code: `VALIDATOR_ERROR_FIELD_IS_ALREADY_IN_USE`

### `isRequiredValidator = (field = '') => (doc = {})`

Validate if a field is present/not empty.

Translation code: `VALIDATOR_ERROR_FIELD_IS_REQUIRED`

### `isTooLongValidator = (field = '', maxLength = 0) => (doc = {})`

Validate if a string field has exceeded a given max length.

Translation code: `VALIDATOR_ERROR_FIELD_IS_TOO_LONG`

### `isValidEmailValidator = (doc = {})`

Validate if field "doc.email" is a valid email.

Translation code: `VALIDATOR_ERROR_EMAIL_INVALID`
