exports.userNotFoundError = (userId) => ({
  code: 'USER_NOT_FOUND',
  field: '',
  message: `User "${userId}" was not found.`, // TODO: i18n,
});
