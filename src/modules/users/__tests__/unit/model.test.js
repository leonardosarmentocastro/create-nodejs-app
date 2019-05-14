const test = require('ava');

const { usersSchema } = require('../../model');
const { sharedSchema } = require('../../../shared');

const deepClone = (object) => JSON.parse(JSON.stringify(object));
test('usersSchema must inherit sharedSchema fields', t => {
  const usersSchemaFields = deepClone(usersSchema.tree);
  const sharedSchemaFields = deepClone(sharedSchema.tree);

  Object.entries(sharedSchemaFields)
    .forEach(([ key, value ]) => t.deepEqual(usersSchemaFields[key], value));
});
