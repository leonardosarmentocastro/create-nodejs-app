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
const { UsersModel, USERS_USERNAME_MAX_LENGTH } = require('../../model');
const {
  isAlreadyInUseValidator,
  isValidEmailValidator,
  isRequiredValidator,
  isTooLongValidator,
} = require('../../../../shared');

// Setup
test.before('prepare: start api / connect to database', async t => {
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
  const user = { ...validUserFixture };

  // Execute
  const response = await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  });

  // Assert
  t.assert(response.statusCode == 200);
  t.truthy(response.body.id);
  Object.keys(user)
    .forEach(key => t.assert(response.body[key] === user[key]));
});

test('(500) must return an error when not providing an email', async t => {
  // Prepare
  const user = {
    ...validUserFixture,
    email: ''
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isRequiredValidator('email')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when not providing an username', async t => {
  // Prepare
  const user = {
    ...validUserFixture,
    username: ''
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  })
  // Assert
  .catch(async error => {
    const { validator, ...err } = isRequiredValidator('username')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an invalid email', async t => {
  // Prepare
  const user = {
    ...validUserFixture,
    email: 'invalid@123!!!!.com.br'
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isValidEmailValidator(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an email that is already being used', async t => {
  // Prepare
  const user = {
    ...validUserFixture,
    email: 'email@already-being-used.com'
  };
  await new UsersModel(user).save();

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  })
  // Assert
  .catch(async error => {
    const { validator, ...err } = isAlreadyInUseValidator('email')(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test(`(500) must return an error when providing an username that exceeds "${USERS_USERNAME_MAX_LENGTH}" characters`, async t => {
  // Prepare
  const user = {
    ...validUserFixture,
    username: 'a'.repeat(USERS_USERNAME_MAX_LENGTH + 1)
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isTooLongValidator('username', USERS_USERNAME_MAX_LENGTH)(user);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user));
  });
});

test('(500) must return an error when providing an username that is already being used', async t => {
  // Prepare
  const username = 'already-being-used';
  const user1 = { ...validUserFixture, username };
  await new UsersModel(user1).save();

  const email = 'email@not-being-used.com';
  const user2 = { email, username };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user2,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isAlreadyInUseValidator('username')(user2);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user2));
  });
});
