const USERNAME_MAX_LENGTH = 24;
const isUsernameTooLong = (userDoc) => ({
  code: 'USERS_ERROR_USERNAME_TOO_LONG',
  field: 'username',
  validator: () =>
    (userDoc.username.length <= USERNAME_MAX_LENGTH) // CONVENTION: Returned value must refer to "isValid" check.
});

module.exports = {
  isUsernameTooLong,
  USERNAME_MAX_LENGTH,
};
