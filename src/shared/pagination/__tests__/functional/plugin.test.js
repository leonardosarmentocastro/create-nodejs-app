const test = require('ava');
const mongoose = require('mongoose');

const database = require('../../../../database');
const { paginationPlugin } = require('../../plugin');
const {
  PRODUCTS,
  PRODUCT1, PRODUCT2, PRODUCT3,
  PRODUCT4, PRODUCT5, PRODUCT6,
  PRODUCT7, PRODUCT8, PRODUCT9,
  PRODUCT10
} = require('../../__fixtures__');

test.before('connect to database', t => database.connect());
test.before('create sample products model to work with on tests', t => {
  const schema = new mongoose.Schema({ name: String, price: Number });
  schema.plugin(paginationPlugin);
  schema.set('toObject', {
    // Wipe out MongoDB internal fields.
    transform: (doc, ret) => {
      const { __v, _id, ...fields } = ret;
      return fields;
    },
  });

  t.context.model = mongoose.model('Product', schema);
});
test.before('cleanup / sequentially creates registries on database', async t => {
  await t.context.model.deleteMany({});

  for (const product of PRODUCTS) {
    await t.context.model.create(product);
  }
});

test('(results::docs) when "toJson" option is active, must contain the results from pagination query as json objects', async t => {
  const pagination = { conditions: {},  limit: 3,  page: 1, sort: '' };
  const options = { toJson: true };

  const results1 = await t.context.model.paginate(pagination, options);
  t.deepEqual(results1.docs, [ PRODUCT1, PRODUCT2, PRODUCT3 ]);

  const results2 = await t.context.model.paginate({ ...pagination, page: 2 }, options);
  t.deepEqual(results2.docs, [ PRODUCT4, PRODUCT5, PRODUCT6 ]);

  const results3 = await t.context.model.paginate({ ...pagination, page: 3 }, options);
  t.deepEqual(results3.docs, [ PRODUCT7, PRODUCT8, PRODUCT9 ]);

  const results4 = await t.context.model.paginate({ ...pagination, page: 4 }, options);
  t.deepEqual(results4.docs, [ PRODUCT10 ]);
});

test.todo('(results::docs) when "toJson" option is disabled, must contain the results from pagination query as mongoose models');

test.todo('(results::hasNextPage)');
test.todo('(results::hasPreviousPage)');
test.todo('(results::nextPage)');
test.todo('(results::previousPage)');
test.todo('(results::totalCount)');
test.todo('(results::totalPages)');
