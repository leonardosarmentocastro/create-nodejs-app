const test = require('ava');
const got = require('got');
const mongoose = require('mongoose');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  LOCALE,
  startApiOnRandomPort,
} = require('../../../__helpers__');
const { validUserFixture } = require('../__fixtures__');
const { USERS_ERROR_USER_NOT_FOUND } = require('../../errors');
const { translate } = require('../../../../i18n');
const { UsersModel } = require('../../model');
const {
  // isEmailAlreadyInUse,
  // isEmailValid,
  isRequired,
  // isUsernameAlreadyInUse,
  // isUsernameTooLong,
  // USERNAME_MAX_LENGTH,
} = require('../../validators');

// Utility
const getUrl = (t, userId = t.context.user.id) => t.context.url.replace(':id', userId);

// Setup
test.before('start api / connect to database', async t => {
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

// Tests
test('(200) must return the newly updated user', async t => {
  // Prepare
  const userPayload = { email: 'new-email@domain.com' };

  // Execute
  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  });

  // Assert
  const updatedUser = response.body;
  t.assert(updatedUser.id === t.context.user.id); // not updated field
  t.assert(updatedUser.username === t.context.user.username); // not updated field
  t.assert(updatedUser.email === userPayload.email); // updated field
});

test('(500) must return an error if the user doesn\'t exists', async t => {
  // Prepare
  const userId = mongoose.Types.ObjectId();

  // Execute
  await got.put(getUrl(t, userId), getRequestOptions(t))
    // Assert
    .catch(error => {
      const err = USERS_ERROR_USER_NOT_FOUND;
      const args = { userId };

      t.assert(error.response.statusCode === 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
    });
});

test('(500) must return an error when providing an empty email', async t => {
  // Prepare
  const userPayload = { email: '' };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isRequired('email')(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

// test('(500) must return an error when providing an invalid email', async t => {

// });

// test('(500) must return an error when providing an email that is already being used', async t => {

// });

// test('(500) must return an error when providing an empty username', async t => {

// });

// test(`(500) must return an error when providing an username that exceeds "${USERNAME_MAX_LENGTH}" characters`, async t => {

// });

// test('(500) must return an error when providing an username that is already being used', async t => {

// });
