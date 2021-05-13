const { translate } = require('@leonardosarmentocastro/i18n');

exports.AUTHENTICATION_ERROR_EMAIL_NOT_FOUND = {
  code: 'AUTHENTICATION_ERROR_EMAIL_NOT_FOUND',
};

exports.AUTHENTICATION_ERROR_PASSWORD_MISMATCH = {
  code: 'AUTHENTICATION_ERROR_PASSWORD_MISMATCH',
};

// TODO: Make sure we are asserting the right "statusCodes" on tests.
exports.translatedError = (req, res, { err, statusCode = 401 }) =>
  res.status(statusCode).json(
    translate.error(err, req.locale, {})
  );
