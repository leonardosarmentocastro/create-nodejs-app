const test = require('ava');
const mongoose = require('mongoose');
const got = require('got');
const server = require('@leonardosarmentocastro/server');
const i18n = require('@leonardosarmentocastro/i18n');
const { database } = require('@leonardosarmentocastro/database');
const { validate, isRequiredValidator } = require('@leonardosarmentocastro/validate');
const { paginationPlugin } = require('@leonardosarmentocastro/pagination');

const { crud } = require('../../crud');
const PRODUCT1 = { name: 'product1' }

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
      schema.set('toObject', {
        transform: (doc, ret) => {
          const { __v, _id, ...fields } = ret;
          return fields;
        },
        virtuals: true // Expose "id" instead of "_id".
      });
      schema.plugin(paginationPlugin);

      const model = mongoose.model('Product', schema);
      crud.connect(app, model);
      t.context.model = model; // it's gonna be used on tests.
    },
  });
});

test.after.always('teardown: api/database', async t => {
  await server.close(t.context.api);
});

test('[C] must succeed on creating an entry for any given model (e.g. "/products")', async t => {
  const response = await got.post(`http://127.0.0.1:8080/products`, { json: PRODUCT1 });
  const body = JSON.parse(response.body);

  t.assert(response.statusCode === 200);
  t.notDeepEqual(body, {});
  t.is(body.name, PRODUCT1.name);
  t.truthy(body.id);
});

test('[C] when failing to create an entry for model, return an translated error', t => {
  const field = 'name';
  const payload = { [field]: '' };

  return got.post(`http://127.0.0.1:8080/products`, {
    json: payload,
    headers: { 'accept-language': 'pt-br' },
  }).catch(error => {
    const { validator, ...err } = isRequiredValidator(field)(payload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(JSON.parse(error.response.body), i18n.translate.error(err, 'pt-br', payload));
  });
});

test('[R] must succeed on reading entries for any given model (e.g. "/products")', async t => {
  await t.context.model.deleteMany({});
  const product1 = (await t.context.model.create(PRODUCT1)).toObject();

  const response = await got(`http://127.0.0.1:8080/products`);
  const body = JSON.parse(response.body);

  t.assert(response.statusCode === 200);
  t.notDeepEqual(body, {});
  t.deepEqual(body, {
    docs: [ product1 ],
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    previousPage: null,
    totalCount: 1,
    totalPages: 1,
  });
});

test.todo('[R] when failing to read registries for any given model, return an translated error');
