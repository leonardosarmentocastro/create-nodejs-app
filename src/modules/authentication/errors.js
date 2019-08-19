const { translate } = require('../../i18n');
const dayjs = require('dayjs');

// https://github.com/auth0/node-jsonwebtoken#tokenexpirederror
exports.authenticationErrorTokenExpired = (err) => ({
  name: 'AUTHENTICATION_ERROR_TOKEN_EXPIRED',
  expiredAt: dayjs(err.expiredAt).toISOString() , // 1408621000 -> "1970-01-17T07:17:01.000Z"
});

// https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror
exports.authenticationErrorTokenInvalid = (err) => ({
  name: 'AUTHENTICATION_ERROR_TOKEN_INVALID',
  jwtMessage: err.message, // NOTE: Not using prop "message" as it's used to serve translated messages.
});

// https://github.com/auth0/node-jsonwebtoken#notbeforeerror
exports.authenticationErrorTokenNotBefore = (err) => ({
  name: 'AUTHENTICATION_ERROR_TOKEN_NOT_BEFORE',
  date: err.date, // "2018-10-04T16:10:44.000Z"
});

exports.authenticationTranslatedError = (req, res, { err }) =>
  res.status(401).json(
    translate.error(err, req.locale, {})
  );
