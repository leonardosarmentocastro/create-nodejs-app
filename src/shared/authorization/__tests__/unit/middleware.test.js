const test = require('ava');

const { AUTHORIZATION_INVALID_TOKEN_ERROR } = require('../../errors');
const { authorizationMiddleware } = require('../../middleware');
const { translate } = require('../../../../i18n');

// Setup
test.before('load "LOCALE" from environment variables', t => {
  require('dotenv').config(); // Load environment variables from ".env".
});

test('must return a translated error on validation failure', t => {
  const req = {
    header: () => 'invalid-header',
    locale: process.env.LANGUAGE,
  };
  const res = {
    status: function() { return this; },
    json: (payload) => payload,
  };
  const next = () => null;
  const err = authorizationMiddleware(req, res, next);

  t.deepEqual(
    err,
    translate.error(AUTHORIZATION_INVALID_TOKEN_ERROR, req.locale, {})
  );
});
