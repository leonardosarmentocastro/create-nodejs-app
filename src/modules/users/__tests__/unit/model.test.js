const test = require('ava');

const { authenticationSchema } = require('../../../authentication');
const { transform, usersSchema } = require('../../model');
const { commonSchema } = require('@leonardosarmentocastro/database');

const deepClone = (object) => JSON.parse(JSON.stringify(object));
const usersSchemaFields = deepClone(usersSchema.tree);

test('"usersSchema" must inherit some fields from other schemas', t => {
  [ authenticationSchema, commonSchema ].forEach(inheritedSchema => {
    const inheritedSchemaFields = deepClone(inheritedSchema.tree); // NOTE: Only works with schema fields defined as "{}" (e.g. "{ type: String }").

    Object.entries(inheritedSchemaFields)
      .forEach(([ key, value ]) =>
        t.deepEqual(usersSchemaFields[key], value, `Field "${key}" should be inherited by "usersSchema".`)
      );
  });
});

test('(transform) must strip "__v", "_id" and "password" from doc', t => {
  const fieldsNotToBeStripped = {
    id: '123',
    email: 'email@domain.com',
    username: 'username'
  };

  const doc = {}; // The mongoose document which is being converted
  const ret = { // The plain object representation which has been converted
    ...fieldsNotToBeStripped,

    __v: 0,
    _id: 'must be stripped',
    password: '123',
  };

  t.deepEqual(transform(doc, ret), fieldsNotToBeStripped);
});
