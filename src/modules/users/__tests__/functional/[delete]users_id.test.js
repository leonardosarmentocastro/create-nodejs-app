const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
const { UsersModel } = require('../../model');
const { userNotFoundTestcase } = require('./testcases');
const { validUserFixture } = require('../__fixtures__');
const { getUrl } = require('./__helpers__');
const {
  getRequestOptions,
  startApiOnRandomPort,
  closeApiOpenedOnRandomPort
} = require('../../../__helpers__');

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointMethod = 'delete';
  t.context.endpointOriginalPath = '/users/:id';

  await startApiOnRandomPort(t);
  await database.connect();
});
test.beforeEach('cleanup database', t => UsersModel.deleteMany());
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Tests
test('(200) must succeed on deleting the user, returning an empty body', async t => {
  const createdUser = await UsersModel.create(validUserFixture);
  const transformedUser = createdUser.toObject();
  const userId = transformedUser.id;

  const response = await got(getUrl(t, userId), getRequestOptions(t));
  t.assert(response.statusCode == 200);
  t.falsy(response.body);
  t.assert((await UsersModel.findById(userId)) == null);
});

// Unhappy path tests
test(userNotFoundTestcase.title2, t => {
  const userId = '123';
  t.context.testcaseUrl = getUrl(t, userId);

  return userNotFoundTestcase.test(t, userId);
});
