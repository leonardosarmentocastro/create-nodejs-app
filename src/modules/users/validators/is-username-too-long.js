const USERNAME_MAX_LENGTH = 24;
const isUsernameTooLong = (userDoc) => ({
  code: 'USERNAME_TOO_LONG',
  field: 'username',
  message: `The username "${userDoc.username}" is too long (max length is ${USERNAME_MAX_LENGTH}).`, // TODO: i18n,
  validator: () =>
    (userDoc.username.length <= USERNAME_MAX_LENGTH) // CONVENTION: Returned value must refer to "isValid" check.
});

module.exports = {
  isUsernameTooLong,
  USERNAME_MAX_LENGTH,
};
