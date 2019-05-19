const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../__helpers__');

const endpointOriginalPath = `/health`;
test.before(t => startApiOnRandomPort(t, endpointOriginalPath));

test.serial('(200) must return the application healthy check status', async t => {
  const response = await got(t.context.url, getRequestOptions(t, endpointOriginalPath));
  t.deepEqual(response.body, {
    application: 'up',
  });
});

test.after(t => theOwl.createDocs());
test.after.always(t => closeApiOpenedOnRandomPort(t));
