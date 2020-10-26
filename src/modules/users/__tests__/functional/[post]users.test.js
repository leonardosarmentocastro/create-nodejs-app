const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {
  emailIsInvalidTestcase,
  fieldIsAlreadyInUseTestcase,
  fieldIsEmptyTestcase,
  fieldIsTooLongTestcase,
  notSettableFieldsAreIgnoredTestcase,
  passwordIsStrongTestcase,
} = require('./testcases');
const { UsersModel, USERS_USERNAME_MAX_LENGTH } = require('../../model');
const { validUserFixture } = require('../__fixtures__');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../../__helpers__');

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointMethod = 'post';
  t.context.endpointOriginalPath = '/users';

  await startApiOnRandomPort(t);
  await database.mongodb.connect();
});
test.beforeEach('cleanup database', t => UsersModel.deleteMany());
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Happy path tests
test('(200) must succeed on creating the user and return the newly created doc', async t => {
  const userPayload = { ...validUserFixture };

  const response = await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: userPayload,
  });

  const createdUser = response.body;
  t.assert(response.statusCode == 200);
  t.truthy(createdUser.id);
  t.falsy(createdUser.password);
  Object.keys(userPayload)
    .filter(key => key !== 'password')
    .forEach(key => t.assert(createdUser[key] === userPayload[key]));
});

test(notSettableFieldsAreIgnoredTestcase.title, t => {
  t.context.testcaseUrl = t.context.endpointBaseUrl;
  return notSettableFieldsAreIgnoredTestcase.test(t);
});

// Unhappy path tests
[ emailIsInvalidTestcase, passwordIsStrongTestcase ].forEach(testcase => {
  test(testcase.title, t => {
    t.context.testcaseUrl = t.context.endpointBaseUrl;
    return testcase.test(t);
  });
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

[ 'email', 'username', 'password' ].forEach(field => {
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
