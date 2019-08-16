const { validate } = require('./validate');
const { authorizationTranslatedError } = require('./errors');

exports.authorizationMiddleware = (publicRoutes) => (req, res, next) => {
  const err = validate(req, { publicRoutes });
  if (err) return authorizationTranslatedError(req, res, { err });

  next();
};
