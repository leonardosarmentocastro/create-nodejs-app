const dayjs = require('dayjs');
const test = require('ava');

const { preSaveMiddleware } = require('../../schema');

const sleep = ms => setTimeout(() => Promise.resolve(), ms);
test('[preSaveMiddleware] must set a new value to "updatedAt" field', async t => {
  const next = () => null;
  const now = dayjs().toISOString();
  const schema = { updatedAt: dayjs(now) };

  await sleep(10);
  preSaveMiddleware.call(schema, next);
  t.assert(schema.updatedAt !== now);
});
