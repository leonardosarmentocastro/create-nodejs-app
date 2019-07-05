const test = require('ava');

const {
  DEFAULT,
  paginationMiddleware,
  useDefaultValuesWhenNecessary,
} = require('../..');

test('(useDefaultValuesWhenNecessary) must set default value to prop if none was given', t => {
  const [ firstPropKey ] = Object.keys(DEFAULT);
  const propsWithoutValues = Object.keys(DEFAULT)
    .reduce((accumulator, key) => ({
      ...accumulator,
      [key]: null
    }), {});

  const value = 'this must not be replaced by default values!';
  const queryParameters = useDefaultValuesWhenNecessary({
    ...propsWithoutValues,
    [firstPropKey]: value,
  });

  t.deepEqual(queryParameters, {
    ...DEFAULT,
    [firstPropKey]: value,
  });
});

// TODO: refactor?/move to its own file? ()
const mustThrowErrorTestcase = (t) => (invalidValues, paramName) => {
  invalidValues.forEach(invalidValue => {
    const invalidReq = {
      query: { [paramName]: invalidValue },
    };

    t.throws(() => paginationMiddleware(invalidReq, {}, () => null), Error);
  });
};
test('must throw an error if param "c" is not a valid json', t => {
  const invalidValues = [ '{ #invalid: "json" }', 'string', 123, true ];
  const paramName = 'c';

  mustThrowErrorTestcase(t)(invalidValues, paramName);
});

test('must throw an error if param "l" is not an number', t => {
  const invalidValues = [ '{ "valid": "json" }', '{ #invalid: "json" }', 'string', 123, true ];
  const paramName = 'l';

  mustThrowErrorTestcase(t)(invalidValues, paramName);
});

test.todo('must throw an error if param "p" is not an number');
test.todo('must throw an error if param "s" is not a string');

test.todo('must map "sort" param (string contaning prop names separated by ";") to an key/value object');
test.todo('must set sorting for field to "asc" if no symbol ("+" or "-") is found on its last character');
