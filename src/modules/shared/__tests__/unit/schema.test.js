const dayjs = require('dayjs');
const test = require('ava');

const { preSaveMiddleware } = require('../../schema');

test('[preSaveMiddleware] must set a new value to "updatedAt" field', async t => {
  const next = () => null;
  const oneDayAgo = dayjs().subtract(1, 'day').toISOString();
  const schema = { updatedAt: dayjs(oneDayAgo) };

  preSaveMiddleware.call(schema, next);
  t.assert(schema.updatedAt !== oneDayAgo);
});
