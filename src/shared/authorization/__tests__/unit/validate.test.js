const test = require('ava');

const { AUTHORIZATION_INVALID_TOKEN_ERROR } = require('../../errors');
const { validate, PUBLIC_ROUTES } = require('../../validate');

// Fixtures
const PRIVATE_ROUTES = [
  { method: 'GET', url: '/users' },
  { method: 'POST', url: '/users' },
  { method: 'DELETE', url: '/users/:id' },
  { method: 'GET', url: '/users/:id' },
  { method: 'POST', url: '/users/:id' },
];

// Setup
test.before('load "authorization token" from environment variables', t => {
  require('dotenv').config(); // Load environment variables from ".env".

  t.context.VALID_TOKEN = process.env.AUTHORIZATION_TOKEN;
  t.context.INVALID_TOKENS = [ 'invalid-token', 'Bearer 123', 'Bearer', '123', '' ];
  t.context.TOKENS = [ t.context.VALID_TOKEN, ...t.context.INVALID_TOKENS ];
});

// Tests
test('must authorize when accessing "public routes" with/without a "valid authorization token"', t => {
  PUBLIC_ROUTES.forEach(({ method, url }) => {
    t.context.TOKENS.forEach(token => {
      const req = { header: () => token, method, url };
      const error = validate(req);

      t.is(error, null);
    });
  });
});

test('must authorize when accessing a "private routes" with a "valid authorization token"', t => {
  PRIVATE_ROUTES.forEach(({ method, url }) => {
    const req = { header: () => t.context.VALID_TOKEN, method, url };
    const error = validate(req);

    t.is(error, null);
  });
});

test('must unauthorize when accessing "private routes" with an "invalid authorization token"', t => {
  PRIVATE_ROUTES.forEach(({ method, url }) => {
    t.context.INVALID_TOKENS.forEach(token => {
      const req = { header: () => token, method, url };
      const error = validate(req);

      t.is(error, AUTHORIZATION_INVALID_TOKEN_ERROR);
    });
  });
});
