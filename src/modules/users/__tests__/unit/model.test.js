const test = require('ava');
const { authenticationSchema } = require('@leonardosarmentocastro/authentication');
const { commonSchema } = require('@leonardosarmentocastro/database');

const { usersSchema } = require('../../model');

const deepClone = (object) => JSON.parse(JSON.stringify(object));
const usersSchemaFields = deepClone(usersSchema.tree);

test.skip('"usersSchema" must inherit some fields from other schemas', t => {
  console.log('@ usersSchemaFields', usersSchemaFields)
  [ authenticationSchema, commonSchema ].forEach(inheritedSchema => {
    const inheritedSchemaFields = deepClone(inheritedSchema.tree); // NOTE: Only works with schema fields defined as "{}" (e.g. "{ type: String }").

    console.log('@ inheritedSchemaFields', inheritedSchemaFields)
    Object.entries(inheritedSchemaFields)
      .forEach(([ key, value ]) =>
        t.deepEqual(usersSchemaFields[key], value, `Field "${key}" should be inherited by "usersSchema".`)
      );
  });
});
