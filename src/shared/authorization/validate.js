const { AUTHORIZATION_INVALID_TOKEN_ERROR } = require('./errors');

const PUBLIC_ROUTES = [
  { method: 'OPTIONS' }, // CORS verification
  { method: 'GET', url: '/health' },
];

const validate = (req) => {
  const isAccessingPublicRoute = PUBLIC_ROUTES.some(publicRoute =>
    publicRoute.method === req.method &&
    publicRoute.url === req.url
  );

  const token = req.header('Authorization'); // "Bearer 123456"
  const isValidAuthorizationToken = (token === process.env.AUTHORIZATION_TOKEN && process.env.NODE_ENV !== 'production');

  switch(true) {
    case isAccessingPublicRoute: return null;
    case !isAccessingPublicRoute && isValidAuthorizationToken: return null;
    case !isAccessingPublicRoute && !isValidAuthorizationToken: return AUTHORIZATION_INVALID_TOKEN_ERROR;
    default: return null;
  }
};

module.exports = { validate, PUBLIC_ROUTES };
