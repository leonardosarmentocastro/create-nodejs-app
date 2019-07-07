const test = require('ava');

const { SHARED_PAGINATION_ERROR_QUERY_PARAMETER_INVALID } = require('../../errors');
const { DEFAULT } = require('../../middleware');
const { validate } = require('../../validate');

[
  {
    field: 'c',
    invalidTitle: (field) => `"${field}" is not a valid json`,
    invalidValues: [ '{ #invalid: "json" }', 'string', '123', 'true' ],
    validValues: [ '{ "email": "email@domain.com", "username": "username123" }' ],
  },
  // Both fields share same validation.
  ...[ 'l', 'p' ].reduce((testcases, field) => testcases.concat({
    field,
    invalidTitle: (field) => `"${field}" is not an number`,
    invalidValues: [ '{ "valid": "json" }', '{ #invalid: "json" }', 'string', 'true' ],
    validValues: [ '10' ],
  }), []),
  {
    field: 's',
    invalidTitle: (field) => `"${field}" is not a string combination of prop + sorting sufix (e.g. "email-" or "email+")`,
    invalidValues: [ '{ "valid": "json" }', 'string', '123', 'true', '-email', '+email', 'email', '+' ],
    validValues: [ 'email+', 'username-' ],
  },
].forEach(({ field, invalidTitle, invalidValues, validValues }) => {
  test(`must return null on successful validation for field "${field}"`, t => {
    validValues.forEach(validValue => {
      const queryParameters = { ...DEFAULT, [field]: validValue };
      const error = validate(queryParameters);

      t.assert(error === null);
    });
  });

  test(`must return an error if ${invalidTitle(field)}`, t => {
    invalidValues.forEach(invalidValue => {
      const queryParameters = { ...DEFAULT, [field]: invalidValue };
      const error = validate(queryParameters);

      t.deepEqual(error, {
        ...SHARED_PAGINATION_ERROR_QUERY_PARAMETER_INVALID,
        field,
      });
    });
  });
});
