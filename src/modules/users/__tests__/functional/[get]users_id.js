const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');
const mongoose = require('mongoose');

const database = require('../../../../database');
const { validUserFixture } = require('../__fixtures__');
const {
  LOCALE,
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort
} = require('../../../__helpers__');
const { USERS_ERROR_USER_NOT_FOUND } = require('../../errors');
const { UsersModel } = require('../../model');
const { translate } = require('../../../../i18n');

// Utility
const getUrl = (t, userId) => t.context.url.replace(':id', userId);

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointOriginalPath = '/users/:id';

  await startApiOnRandomPort(t);
  await database.connect();
});
test.beforeEach('cleanup database', t => UsersModel.deleteMany());
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Tests
test('(200) must return the user saved on database if it exists', async t => {
  // Prepare
  const user = { ...validUserFixture };
  const savedUser = (await new UsersModel(user).save()).toObject();

  // Execute
  const response = await got(getUrl(t, savedUser.id), getRequestOptions(t));

  // Assert
  t.assert(response.statusCode === 200);
  t.assert(response.body.id === savedUser.id);
  Object.keys(user)
    .forEach(key => t.assert(response.body[key] === user[key]));
});

test('(500) must return an error if the user doesn\'t exist', async t => {
  // Prepare
  const userId = mongoose.Types.ObjectId();

  // Execute
  await got(getUrl(t, userId), getRequestOptions(t))
    // Assert
    .catch(error => {
      const err = USERS_ERROR_USER_NOT_FOUND;
      const args = { userId };

      t.assert(error.response.statusCode === 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
    });
});
