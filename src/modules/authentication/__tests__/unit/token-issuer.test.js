const test = require('ava');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const { authenticationTokenIssuer } = require('../../token-issuer');

test.before('setup necessary environment variables', t => {
  process.env.AUTHENTICATION_SECRET = 'authentication-secret-test.middleware';
});

test('must generate a jwt token that expires in 7 days, and sign it with current environment authentication secret', t => {
  const user = { id: '123' };
  const authenticationToken = authenticationTokenIssuer.sign(user);

  // Assertions
  t.truthy(authenticationToken);
  t.notThrows(() => jwt.verify(authenticationToken, process.env.AUTHENTICATION_SECRET));

  const decodedToken = jwt.decode(authenticationToken, { json: true });
  const { exp, iss, payload, sub } = decodedToken;
  const jwtStandardExpirationDate = dayjs('1970-01-01T00:00:00Z'); // https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim

  t.assert(jwtStandardExpirationDate.add(exp, 's').date() === dayjs().add(7, 'day').date());
  t.assert(iss === 'create-nodejs-app/authentication');
  t.deepEqual(payload, {});
  t.assert(sub === user.id);
});
