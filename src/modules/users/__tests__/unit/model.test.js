const test = require('ava');

const { authenticationSchema } = require('../../../authentication');
const { usersSchema } = require('../../model');
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
