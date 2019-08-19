const test = require('ava');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const { authenticationMiddleware } = require('../../middleware');

test.before('setup necessary environment variables', t => {
  process.env.AUTHENTICATION_SECRET = 'authentication-secret-test.middleware';
});

test('must attach decoded data from authorization token to "req.authentication"', async t => {
  const authorizationToken = jwt.sign({
    payload: { role: 'admin' },
  },
  process.env.AUTHENTICATION_SECRET, {
    expiresIn: '1h',
    issuer: 'authentication-middleware',
    subject: 'userId.123456',
  });
  const req = { header: () => `Bearer ${authorizationToken}` };

  await authenticationMiddleware(req, () => null, () => null);

  const decodedToken = jwt.decode(authorizationToken, { json: true });
  t.deepEqual(req.authentication, {
    expirationTime: dayjs(decodedToken.exp).toISOString(),
    issuer: 'authentication-middleware',
    issuedAt: dayjs(decodedToken.iat).toISOString(),
    subject: 'userId.123456',
    payload: { role: 'admin' },
  });
});
