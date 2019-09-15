// NOTE/TODO: this should be a parameter of authorizationMiddleware, in order to be a completely independent piece of software.
exports.PUBLIC_ROUTES = [
  { method: 'options' }, // CORS verification
  { method: 'get', url: '/' },
  { method: 'get', url: '/health' },
  { method: 'post', url: '/authentication/sign-up' },
  { method: 'post', url: '/authentication/sign-in' },
];
