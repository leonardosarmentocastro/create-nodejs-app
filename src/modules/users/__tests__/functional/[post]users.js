const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort
} = require('../../../__helpers__');
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

const validUser = { email: 'email@domain.com', username: 'username123' };
test('(200) must return the newly created user', async t => {
  const user = { ...validUser };
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
    ...validUser,
    email: ''
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isRequired('email')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});

test('(500) must return an error when not providing an username', async t => {
  const user = {
    ...validUser,
    username: ''
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(async error => {
    const { validator, ...err } = isRequired('username')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});

test('(500) must return an error when providing an invalid email', async t => {
  const user = {
    ...validUser,
    email: 'invalid@123!!!!.com.br'
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isEmailValid(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});

test('(500) must return an error when providing an email that is already being used', async t => {
  const user = {
    ...validUser,
    email: 'email@already-being-used.com'
  };
  await new UsersModel(user).save();

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(async error => {
    const { validator, ...err } = isEmailAlreadyInUse(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});

test(`(500) must return an error when providing an username that exceeds "${USERNAME_MAX_LENGTH}" characters`, async t => {
  const user = {
    ...validUser,
    username: 'a'.repeat(USERNAME_MAX_LENGTH + 1)
  };

  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user,
  }).catch(error => {
    const { validator, ...err } = isUsernameTooLong(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});

test('(500) must return an error when providing an username that is already being used', async t => {
  const email = 'email@not-being-used.com';
  const username = 'already-being-used';
  const user1 = { ...validUser, username };
  await new UsersModel(user1).save();

  const user2 = { ...user1, email };
  await got.post(t.context.url, {
    ...getRequestOptions(t, endpointOriginalPath),
    body: user2,
  }).catch(error => {
    const { validator, ...err } = isUsernameAlreadyInUse(user1);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, err);
  });
});
