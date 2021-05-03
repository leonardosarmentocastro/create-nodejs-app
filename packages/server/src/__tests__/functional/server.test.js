const test = require('ava');
const got = require('got');

const { server } = require('../../server');

test('server can start/close and is reachable', async t => {
  const port = 8080;
  const api = await server.start(port);

  const body = await got(`http://127.0.0.1:${port}/`).json();
  t.deepEqual(body, { application: 'up' });

  await server.close(api);
});

test('server is customizable (routes can be added)', async t => {
  const port = 8080;
  const api = await server.start(port, {
    connect: (app) => {
      app.get('/custom-route', (req, res) => res.json({ customizable: true }))
    },
  });

  const body = await got(`http://127.0.0.1:${port}/custom-route`).json();
  t.deepEqual(body, { customizable: true });

  await server.close(api);
});

test('server is customizable (middlewares can be added)', async t => {
  const port = 8080;
  const api = await server.start(port, {
    connect: (app) => {
      app.use((req, res, next) => {
        res.set('customizable', true);
        next();
      });
    },
  });

  const response = await got(`http://127.0.0.1:${port}`);
  t.is(response.headers.customizable, 'true');

  await server.close(api);
});
