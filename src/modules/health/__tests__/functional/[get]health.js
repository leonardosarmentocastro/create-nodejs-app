const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const {
  setupFunctionalTest,
  tearDownFunctionalTest
} = require('../../../__helpers__');

const endpointOriginalPath = `/health`;
test.before(t => setupFunctionalTest(t, endpointOriginalPath));

test('(200) must return the application healthy check status', async t => {
  const response = await got(t.context.url, {
    headers: { ...theOwl.buildHeaders(t.title, endpointOriginalPath) },
    json: true
  });

  t.deepEqual(response.body, {
    application: 'up',
  });
});

test.after(t => theOwl.createDocs());
test.after.always(t => tearDownFunctionalTest(t));
