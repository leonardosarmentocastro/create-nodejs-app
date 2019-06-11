const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
const { validUserFixture } = require('../__fixtures__');
const {
  LOCALE,
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../__helpers__');
const { translate } = require('../../../../i18n');
const { UsersModel } = require('../../model');
const {
  isEmailAlreadyInUse,
  isEmailValid,
  isRequired,
  isUsernameAlreadyInUse,
  isUsernameTooLong,
  USERNAME_MAX_LENGTH,
} = require('../../validators');

const endpointOriginalPath = '/users';
test.before(async t => {
  await startApiOnRandomPort(t, endpointOriginalPath);
  await database.connect();
});
test.beforeEach(t => UsersModel.deleteMany());
test.after(t => theOwl.createDocs());
test.after.always(t => closeApiOpenedOnRandomPort(t));

test('(200) must return the newly created user', async t => {
  const user = { ...validUserFixture };
  const response = await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  });

  t.assert(response.statusCode == 200);
  t.truthy(response.body.id);
  Object.keys(user)
    .forEach(key => t.assert(response.body[key] === user[key]));
});

test('(500) must return an error when not providing an email', async t => {
  const user = {
    ...validUserFixture,
    email: ''
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isRequired('email')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when not providing an username', async t => {
  const user = {
    ...validUserFixture,
    username: ''
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(async error => {
    const { validator, ...err } = isRequired('username')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an invalid email', async t => {
  const user = {
    ...validUserFixture,
    email: 'invalid@123!!!!.com.br'
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isEmailValid(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an email that is already being used', async t => {
  const user = {
    ...validUserFixture,
    email: 'email@already-being-used.com'
  };
  await new UsersModel(user).save();

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(async error => {
    const { validator, ...err } = isEmailAlreadyInUse(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test(`(500) must return an error when providing an username that exceeds "${USERNAME_MAX_LENGTH}" characters`, async t => {
  const user = {
    ...validUserFixture,
    username: 'a'.repeat(USERNAME_MAX_LENGTH + 1)
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isUsernameTooLong(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an username that is already being used', async t => {
  const username = 'already-being-used';
  const user1 = { ...validUserFixture, username };
  await new UsersModel(user1).save();

  const email = 'email@not-being-used.com';
  const user2 = { email, username };
  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user2,
  }).catch(error => {
    const { validator, ...err } = isUsernameAlreadyInUse(user2);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user2));
  });
});
