const { translate } = require('@leonardosarmentocastro/i18n');

const USERS_ERROR_USER_NOT_FOUND = {
  code: 'USERS_ERROR_USER_NOT_FOUND',
  field: 'id',
};

const userNotFoundError = (req, res) =>
  res.status(500).json(
    translate.error(USERS_ERROR_USER_NOT_FOUND, req.locale, { userId: req.params.id })
  );

// TODO: serve proper "statusCode" as done in "authorization.signInResolver".
const userTranslatedValidationError = (req, res, { err, userDoc }) => {
  const transformedUser = userDoc.toObject();
  const error = translate.error(err, req.locale, transformedUser);

  return res.status(500).json(error);
};

module.exports = {
  USERS_ERROR_USER_NOT_FOUND,
  userNotFoundError,
  userTranslatedValidationError,
};
