const { AUTHORIZATION_INVALID_TOKEN_ERROR } = require('./errors');

const DEFAULT = {
  publicRoutes: [
    { method: 'OPTIONS' }, // CORS verification
    { method: 'GET', url: '/health' },
  ],
};

const validate = (req, { publicRoutes = DEFAULT.publicRoutes }) => {
  const isAccessingPublicRoute = publicRoutes.some(publicRoute =>
    publicRoute.method === req.method &&
    publicRoute.url === req.url
  );

  const token = req.header('Authorization'); // "Bearer 123456"
  const isValidAuthorizationToken = (!!token && token === process.env.AUTHORIZATION_TOKEN);

  switch(true) {
    case isAccessingPublicRoute: return null;
    case !isAccessingPublicRoute && isValidAuthorizationToken: return null;
    case !isAccessingPublicRoute && !isValidAuthorizationToken: return AUTHORIZATION_INVALID_TOKEN_ERROR;
    default: return null;
  }
};

module.exports = { validate, DEFAULT };
