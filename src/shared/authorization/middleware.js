const { validate } = require('./validate');
const { authorizationTranslatedError } = require('./errors');

exports.authorizationMiddleware = (req, res, next) => {
  const err = validate(req);
  if (err) return authorizationTranslatedError(req, res, { err });

  next();
};
