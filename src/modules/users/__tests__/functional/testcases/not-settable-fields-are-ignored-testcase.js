const got = require('got');

const { validUserFixtureForTestcases } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../__helpers__');
const { SCHEMA_NOT_SETTABLE_FIELDS } = require('../../../../../shared');

exports.notSettableFieldsAreIgnoredTestcase = {
  title: `(200) The fields "${SCHEMA_NOT_SETTABLE_FIELDS.toString()}" must be ignored when creating or updating an user`,
  test: async (t) => {
    const notSettableFields = SCHEMA_NOT_SETTABLE_FIELDS
      .reduce((accumulator, field) => ({ ...accumulator, [field]: 'value' }), {});
    const userPayload = {
      ...validUserFixtureForTestcases(t),
      ...notSettableFields,
    };

    const response = await got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    });

    const createdOrUpdatedUser = response.body;
    t.assert(response.statusCode === 200);
    SCHEMA_NOT_SETTABLE_FIELDS
      .forEach(key =>
        t.assert(createdOrUpdatedUser[key] !== notSettableFields[key])
      );
  },
};
