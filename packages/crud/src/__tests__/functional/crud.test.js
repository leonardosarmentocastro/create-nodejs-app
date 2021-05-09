const test = require('ava');
const mongoose = require('mongoose');
const got = require('got');

const server = require('@leonardosarmentocastro/server');
const i18n = require('@leonardosarmentocastro/i18n');
const { database } = require('@leonardosarmentocastro/database');

const { crud } = require('../../crud');

test.before('setup: start an api/connect to database', async t => {
  await database.connect();

  t.context.api = await server.start(8080, {
    middlewares: (app) => {
      i18n.connect(app);
    },
    routes: (app) => {
      const model = mongoose.model('Potato', new mongoose.Schema({ name: String }));
      crud.connect(app, model);
    },
  });
});

test.after.always('teardown: api/database', async t => {
  await server.close(t.context.api);
});

test('[C] must succeed on creating an entry for any given model (e.g. "/potatoes")', async t => {
  const potato = { name: 'Leonardo' };
  const body = await got.post(`http://127.0.0.1:8080/potatoes`, { json: potato }).json();

  t.notDeepEqual(body, {});
  t.is(body.name, potato.name);
  t.truthy(body._id);
});
