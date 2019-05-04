const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const { server } = require('../../../../server');

const originalPath = `/health`;
const baseUrl = `http://localhost:${process.env.PORT}`;
const url = `${baseUrl}${originalPath}`;
test.before(async t => {
  t.context.api = await server.start();
});

test('(200) must return the application healthy check status', async t => {
  const response = await got(url, {
    headers: { ...theOwl.buildHeaders(t.title, originalPath) },
    json: true
  });

  t.deepEqual(response.body, {
    application: 'up',
  });
});

test.after(t => theOwl.createDocs());
test.after.always(async t => await server.close(t.context.api));
