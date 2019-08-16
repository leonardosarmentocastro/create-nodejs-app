const { translate } = require('../../i18n');

exports.AUTHORIZATION_INVALID_TOKEN_ERROR = {
  code: 'AUTHORIZATION_INVALID_TOKEN_ERROR',
};

exports.authorizationTranslatedError = (req, res, { err }) =>
  res.status(401).json(
    translate.error(err, req.locale, {})
  );
