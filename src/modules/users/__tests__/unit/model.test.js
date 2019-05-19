const test = require('ava');

const { transform, usersSchema } = require('../../model');
const { sharedSchema } = require('../../../shared');

const deepClone = (object) => JSON.parse(JSON.stringify(object));
test('usersSchema must inherit sharedSchema fields', t => {
  const usersSchemaFields = deepClone(usersSchema.tree);
  const sharedSchemaFields = deepClone(sharedSchema.tree);

  Object.entries(sharedSchemaFields)
    .forEach(([ key, value ]) => t.deepEqual(usersSchemaFields[key], value));
});


test('(transform) must strip "_id" and "privateFields" from doc', t => {
  const fieldsNotToStripped = { id: '123', anyOtherField: 'potato' };

  const doc = {}; // The mongoose document which is being converted
  const ret = { // The plain object representation which has been converted
    _id: 'must be stripped',
    privateFields: { password: 'must be stripped' },

    ...fieldsNotToStripped,
  };

  t.deepEqual(transform(doc, ret), fieldsNotToStripped);
});
