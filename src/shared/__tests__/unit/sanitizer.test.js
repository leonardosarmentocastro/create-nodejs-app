const test = require('ava');

const { sharedSanitizer, SCHEMA_NOT_SETTABLE_FIELDS } = require('../../sanitizer');

test('[sharedSanitizer] must remove not settable fields from schema', t => {
  const settableField = 'must not be removed';
  const schema = SCHEMA_NOT_SETTABLE_FIELDS
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
