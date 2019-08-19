exports.PUBLIC_ROUTES = [
  { method: 'options' }, // CORS verification
  { method: 'get', url: '/' },
  { method: 'get', url: '/health' },
  { method: 'post', url: '/authentication/sign-up' },
];
