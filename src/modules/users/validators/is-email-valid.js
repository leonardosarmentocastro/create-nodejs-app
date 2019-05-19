const isEmail = require('validator/lib/isEmail');

exports.isEmailValid = (userDoc) => ({
  code: 'EMAIL_INVALID',
  field: 'email',
  message: `The email "${userDoc.email}" is invalid.`, // TODO: i18n,
  validator: () => isEmail(userDoc.email), // CONVENTION: Returned value must refer to "isValid" check.
});
