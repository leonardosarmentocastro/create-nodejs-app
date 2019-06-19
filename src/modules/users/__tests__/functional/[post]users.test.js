const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {
  fieldIsAlreadyInUseTestcase,
  fieldIsEmptyTestcase,
  fieldIsTooLongTestcase,
} = require('./testcases');
const { validUserFixture, validPrefixedUserFixture } = require('../__fixtures__');
const {
  LOCALE,
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../__helpers__');
const { translate } = require('../../../../i18n');
const { UsersModel, USERS_USERNAME_MAX_LENGTH } = require('../../model');
const {
  isAlreadyInUseValidator,
  isValidEmailValidator,
  isRequiredValidator,
  isTooLongValidator,
  SCHEMA_NOT_SETTABLE_FIELDS,
} = require('../../../../shared');

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointMethod = 'post';
  t.context.endpointOriginalPath = '/users';

  await startApiOnRandomPort(t);
  await database.connect();
});
test.beforeEach('cleanup database', t => UsersModel.deleteMany());
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Tests
test('(200) must return the newly created user', async t => {
  // Prepare
  const userPayload = { ...validUserFixture };

  // Execute
  const response = await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: userPayload,
  });

  // Assert
  const createdUser = response.body;
  t.assert(response.statusCode == 200);
  t.truthy(createdUser.id);
  Object.keys(userPayload)
    .forEach(key => t.assert(createdUser[key] === userPayload[key]));
});

// TODO: replace with model testcases.
test(`(200) must ignore the fields "${SCHEMA_NOT_SETTABLE_FIELDS}" when creating an user`, async t => {
  // Prepare
  const notSettableFields = SCHEMA_NOT_SETTABLE_FIELDS
    .reduce((accumulator, field) => ({ ...accumulator, [field]: 'value' }), {});
  const userPayload = { ...validUserFixture, ...notSettableFields };

  // Execute
  const response = await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: userPayload,
  });

  const createdUser = response.body;
  t.assert(response.statusCode === 200);
  SCHEMA_NOT_SETTABLE_FIELDS
    .forEach(key =>
      t.assert(createdUser[key] !== notSettableFields[key])
    );
});

[
  { field: 'email', value: 'email@already-being-used.com' },
  { field: 'username', value: 'already-being-used' },
].forEach(({ field, value }) => {
  const testcase = fieldIsAlreadyInUseTestcase(field, value);

  test(testcase.title, t => {
    t.context.testcaseUrl = t.context.endpointBaseUrl;
    return testcase.test(t);
  });
});

[ 'email', 'username' ].forEach(field => {
  const testcase = fieldIsEmptyTestcase(field);

  test(testcase.title, t => {
    t.context.testcaseUrl = t.context.endpointBaseUrl;
    return testcase.test(t);
  });
});

[
  { field: 'username', maxLength: USERS_USERNAME_MAX_LENGTH },
].forEach(({ field, maxLength }) => {
  const testcase = fieldIsTooLongTestcase(field, maxLength);

  test(testcase.title, t => {
    t.context.testcaseUrl = t.context.endpointBaseUrl;
    return testcase.test(t);
  });
});

// TODO: replace with model testcases.
test('(500) must return an error when providing an invalid email', async t => {
  // Prepare
  const userPayload = {
    ...validUserFixture,
    email: 'invalid@123!!!!.com.br'
  };

  // Execute
  await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isValidEmailValidator(userPayload);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});
