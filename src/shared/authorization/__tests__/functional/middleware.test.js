const test = require('ava');
const detectPort = require('detect-port');
const express = require('express');
const got = require('got');

const { authorizationMiddleware } = require('../../middleware');

// TODO: move the functional test helpers a folder up, and make it flexible enough to handle
// functional tests outside the "modules" folder.
test.before('setup a test server', async t => {
  const publicRoutes = [{ method: 'get', url: '/public-route' }];
  const app = express();
  app.use(authorizationMiddleware(publicRoutes));
  app.use((req, res, next) => {
    req.locale = 'pt-br';
    next();
  });
  app.get('/private-route', (req, res) => res.status(200).end());
  app.get('/public-route', (req, res) => res.status(200).end());

  const availablePort = await detectPort();
  t.context.baseUrl = `http://localhost:${availablePort}`;
  t.context.api = await new Promise(resolve => {
    app.listen({ port: availablePort }, function() {
      resolve(this);
    });
  });
});

test.after('close test server', t => {
  return new Promise(resolve => t.context.api.close(resolve));
});

test('must unauthorize the request, returning a translated error on validation failure', t => {
  return got(`${t.context.baseUrl}/private-route`)
    .catch(error => {
      t.assert(error.response.statusCode === 500);
      // t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
    });
});
