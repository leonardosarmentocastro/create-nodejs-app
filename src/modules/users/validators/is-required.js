const isEmail = require('validator/lib/isEmail');

exports.isRequired = (field) => (userDoc) => ({
  code: 'IS_REQUIRED',
  field,
  message: `The field "${field}" is required.`, // TODO: i18n,
  validator: () => !!userDoc[field], // CONVENTION: Returned value must refer to "isValid" check.
});
