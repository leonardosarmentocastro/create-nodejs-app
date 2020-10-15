const isEmail = require('validator/lib/isEmail');

exports.isValidEmailValidator = (doc) => ({
  code: 'SHARED_ERROR_EMAIL_INVALID',
  field: 'email',
  validator: () => {
    const isValid = isEmail(doc.email);
    return isValid;
  },
});
