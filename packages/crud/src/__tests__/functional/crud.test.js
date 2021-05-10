const test = require('ava');
const mongoose = require('mongoose');
const got = require('got');

const server = require('@leonardosarmentocastro/server');
const i18n = require('@leonardosarmentocastro/i18n');
const { database } = require('@leonardosarmentocastro/database');
const { validate, isRequiredValidator } = require('@leonardosarmentocastro/validate');

const { crud } = require('../../crud');

test.before('setup: start an api/connect to database', async t => {
  await database.connect();

  t.context.api = await server.start(8080, {
    middlewares: (app) => {
      i18n.connect(app);
    },
    routes: (app) => {
      const schema = new mongoose.Schema({ name: String });
      schema.post('validate', async (doc, next) => {
        const constraints = [ isRequiredValidator('name') ];
        const error = await validate(constraints, doc);

        return next(error);
      });

      const model = mongoose.model('Potato', schema);
      crud.connect(app, model);
    },
  });
});

test.after.always('teardown: api/database', async t => {
  await server.close(t.context.api);
});

test('[C] must succeed on creating an entry for any given model (e.g. "/potatoes")', async t => {
  const potato = { name: 'Leonardo' };
  const response = await got.post(`http://127.0.0.1:8080/potatoes`, { json: potato });
  const body = JSON.parse(response.body);

  t.assert(response.statusCode === 200);
  t.notDeepEqual(body, {});
  t.is(body.name, potato.name);
  t.truthy(body._id);
});

test('[C] when failing to create an entry for model, return an translated error', t => {
  const field = 'name';
  const payload = { [field]: '' };

  return got.post(`http://127.0.0.1:8080/potatoes`, {
    json: payload,
    headers: { 'accept-language': 'pt-br' },
  }).catch(error => {
    const { validator, ...err } = isRequiredValidator(field)(payload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(JSON.parse(error.response.body), i18n.translate.error(err, 'pt-br', payload));
  });
});
