const { AUTHORIZATION_ERROR_INVALID_TOKEN } = require('./errors');
const { PUBLIC_ROUTES } = require('./constants');

exports.validate = (req) => {
  const isAccessingPublicRoute = PUBLIC_ROUTES.some(publicRoute =>
    publicRoute.method === req.method.toLowerCase() &&
    publicRoute.url === req.url.toLowerCase()
  );

  const token = req.header('Authorization'); // "Bearer 123456"
  const isValidAuthorizationToken = (
    process.env.NODE_ENV !== 'production' &&
    !!token &&
    token === process.env.AUTHORIZATION_TOKEN
  );

  switch(true) {
    case isAccessingPublicRoute: return null;
    case !isAccessingPublicRoute && isValidAuthorizationToken: return null;
    case !isAccessingPublicRoute && !isValidAuthorizationToken: return AUTHORIZATION_ERROR_INVALID_TOKEN;
    default: return null;
  }
};
