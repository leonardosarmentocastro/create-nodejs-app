const { validate } = require('./validate');
const { authorizationTranslatedError } = require('./errors');

exports.authorizationMiddleware = (req, res, next) => {
  const error = validate(req);
  if (error) return authorizationTranslatedError(req, res, { error });

  const authorize = next;
  authorize();
};
