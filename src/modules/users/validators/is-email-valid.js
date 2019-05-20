const isEmail = require('validator/lib/isEmail');

exports.isEmailValid = (userDoc) => ({
  code: 'USERS_ERROR_EMAIL_INVALID',
  field: 'email',
  validator: () => isEmail(userDoc.email), // CONVENTION: Returned value must refer to "isValid" check.
});
