const test = require('ava');
const got = require('got');
const mongoose = require('mongoose');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {
  emailIsInvalidTestcase,
  fieldIsAlreadyInUseTestcase,
  fieldIsEmptyTestcase,
  fieldIsTooLongTestcase,
  notSettableFieldsAreIgnoredTestcase,
  passwordIsStrongTestcase,
  userNotFoundTestcase,
} = require('./testcases');
const { UsersModel, USERS_USERNAME_MAX_LENGTH } = require('../../model');
const { getUrl } = require('./__helpers__');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../../__helpers__');
const { validUserFixture } = require('../__fixtures__');

// Setup
test.before('start api / connect to database', async t => {
  t.context.endpointMethod = 'put';
  t.context.endpointOriginalPath = '/users/:id';

  await startApiOnRandomPort(t);
  await database.connect();
});
test.beforeEach('cleanup / prepopulate the database', async t => {
  await UsersModel.deleteMany();

  const createdUser = await UsersModel.create(validUserFixture);
  const transformedUser = createdUser.toObject();
  t.context.user = transformedUser;
});
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('tear down', t => closeApiOpenedOnRandomPort(t));

// Happy path tests
[
  { field: 'email', value: 'new-email@domain.com' },
  { field: 'username', value: 'new-username' },
].forEach(({ field, value }) => {
  test(`(200) must succeed on updating the field "${field}" and always return the full updated document`, async t => {
    const userPayload = { [field]: value };

    const response = await got.put(getUrl(t), {
      ...getRequestOptions(t),
      body: userPayload,
    });

    const updatedUser = response.body;
    t.assert(response.statusCode === 200);
    t.assert(updatedUser[field] === userPayload[field]); // updated field
    t.not(updatedUser.updatedAt, t.context.user.updatedAt); // "updatedAt" must have a new value
    Object.keys(updatedUser)
      .filter(key => ![ field, 'updatedAt'].includes(key))
      .forEach(key =>
        t.assert(updatedUser[key] === t.context.user[key]) // not updated fields
      );
  });
});

test('(200) must succeed on updating "password", while not sending it on payload', async t => {
  const notUpdatedUser = await UsersModel.findById(t.context.user.id); // NOTE: Necessary to have access to "password".
  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: { password: 'abc123def!@#' }, // score 3
  });
  t.assert(response.statusCode === 200);
  t.falsy(response.body.password); // must not be on returned payload

  const updatedUser = await UsersModel.findById(t.context.user.id);
  t.assert(notUpdatedUser.password !== updatedUser.password);
});

test('(200) must be idempotent when updating without setting new values to fields', async t => {
  const { email, username } = t.context.user;
  const userPayload = { email, username };

  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  });

  const updatedUser = response.body;
  t.assert(response.statusCode === 200);
  t.not(updatedUser.updatedAt, t.context.user.updatedAt); // "updatedAt" must have a new value
});

test(notSettableFieldsAreIgnoredTestcase.title, t => {
  t.context.testcaseUrl = getUrl(t);
  return notSettableFieldsAreIgnoredTestcase.test(t);
});

// Unhappy path tests
[ emailIsInvalidTestcase, passwordIsStrongTestcase ].forEach(testcase => {
  test(testcase.title, t => {
    t.context.testcaseUrl = getUrl(t);
    return testcase.test(t);
  });
});

test(userNotFoundTestcase.title1, t => {
  const userId = mongoose.Types.ObjectId();
  t.context.testcaseUrl = getUrl(t, userId);

  return userNotFoundTestcase.test(t, userId);
});

[
  { field: 'email', value: 'email@already-being-used.com' },
  { field: 'username', value: 'already-being-used' },
].forEach(({ field, value }) => {
  const testcase = fieldIsAlreadyInUseTestcase(field, value);

  test(testcase.title, t => {
    t.context.testcaseUrl = getUrl(t);
    return testcase.test(t);
  });
});

[ 'email', 'username', 'password' ].forEach(field => {
  const testcase = fieldIsEmptyTestcase(field);

  test(testcase.title, t => {
    t.context.testcaseUrl = getUrl(t);
    return testcase.test(t);
  });
});

[
  { field: 'username', maxLength: USERS_USERNAME_MAX_LENGTH },
].forEach(({ field, maxLength }) => {
  const testcase = fieldIsTooLongTestcase(field, maxLength);

  test(testcase.title, t => {
    t.context.testcaseUrl = getUrl(t);
    return testcase.test(t);
  });
});
