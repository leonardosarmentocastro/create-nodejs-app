const test = require('ava');
const got = require('got');

const { server } = require('../../server');

test('server can start and is reachable', async t => {
  const port = 8080;
  await server.start(port);

  const body = await got(`http://127.0.0.1:${port}/`).json();
  t.deepEqual(body, { application: 'up' });
});
