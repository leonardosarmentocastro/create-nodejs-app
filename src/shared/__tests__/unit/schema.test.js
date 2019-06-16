const dayjs = require('dayjs');
const test = require('ava');

const {
  preSaveMiddleware,
  sharedSanitizer,
  SHARED_SCHEMA_NOT_SETTABLE_FIELDS,
} = require('../../schema');

test('[preSaveMiddleware] must set the same value of "createdAt" to "updateAt" on document creation', async t => {
  const next = () => null;
  const now = dayjs().toISOString();
  const schema = { createdAt: now, updatedAt: null };

  preSaveMiddleware.call(schema, next);
  t.assert(schema.updatedAt == now);
});

test('[preSaveMiddleware] must set a new value to "updatedAt" field', async t => {
  const next = () => null;
  const oneDayAgo = dayjs().subtract(1, 'day').toISOString();
  const schema = { updatedAt: dayjs(oneDayAgo) };

  preSaveMiddleware.call(schema, next);
  t.assert(schema.updatedAt !== oneDayAgo);
});

test('[sharedSanitizer] must remove not settable fields from schema', t => {
  const settableField = 'must not be removed';
  const schema = SHARED_SCHEMA_NOT_SETTABLE_FIELDS
    .reduce((accumulator, field) => ({ ...accumulator, [field]: 'some value' }), {});

  t.deepEqual(
    sharedSanitizer({ ...schema, settableField }),
    { settableField },
  );

  const notSettableField = 'must be removed';
  const fieldsToRemove = 'notSettableField';
  t.deepEqual(
    sharedSanitizer({ ...schema, notSettableField }, [ fieldsToRemove ]),
    schema
  );
});
