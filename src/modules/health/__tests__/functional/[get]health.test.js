const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../__helpers__');

// Setup
test.before('setup: start api', t => {
  t.context.endpointOriginalPath = '/health';
  return startApiOnRandomPort(t);
});
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Tests
test('(200) must return the application healthy check status', async t => {
  // Execute
  const response = await got(t.context.endpointBaseUrl, getRequestOptions(t));

  // Assert
  t.deepEqual(response.body, {
    application: 'up',
  });
});
