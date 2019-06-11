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

const getUrl = (t, userId = t.context.userId) => t.context.url.replace(':id', userId);
const endpointOriginalPath = '/users/:id';
test.before('start api / connect to database', async t => {
  await startApiOnRandomPort(t, endpointOriginalPath);
  await database.connect();
});
test.beforeEach('cleanup / prepopulate the database', async t => {
  await UsersModel.deleteMany();

  const createdUser = await UsersModel.create(validUserFixture);
  const transformedUser = createdUser.toObject();
  t.context.userId = transformedUser.id;
});
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('tear down', t => closeApiOpenedOnRandomPort(t));

test('(200) must return the newly updated user', async t => {
  const userPayload = { email: 'new-email@domain.com' };

  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t, endpointOriginalPath),
    body: userPayload,
  });

  const updatedUser = response.body;
  t.assert(updatedUser.id === t.context.userId);
  t.assert(updatedUser.email === userPayload.email);
});

test('(500) must return an error if the user doesn\'t exists', async t => {
  const userId = mongoose.Types.ObjectId();
  await got.put(getUrl(t, userId), getRequestOptions(t, endpointOriginalPath))
    .catch(error => {
      const err = USERS_ERROR_USER_NOT_FOUND;
      const args = { userId };

      t.assert(error.response.statusCode === 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
    });
});

test('(500) must return an error when providing an empty email', async t => {
  const userPayload = { email: '' };

  await got.put(getUrl(t), {
    ...getRequestOptions(t, endpointOriginalPath),
    body: userPayload,
  }).catch(error => {
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
