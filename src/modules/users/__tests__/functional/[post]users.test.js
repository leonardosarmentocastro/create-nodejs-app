const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');

const database = require('../../../../database');
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
  const response = await got.post(t.context.url, {
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
  const response = await got.post(t.context.url, {
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

// TODO: replace with model testcases.
test('(500) must return an error when not providing an email', async t => {
  // Prepare
  const userPayload = {
    ...validUserFixture,
    email: ''
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isRequiredValidator('email')(userPayload);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

// TODO: replace with model testcases.
test('(500) must return an error when not providing an username', async t => {
  // Prepare
  const userPayload = {
    ...validUserFixture,
    username: ''
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(async error => {
    const { validator, ...err } = isRequiredValidator('username')(userPayload);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
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
  await got.post(t.context.url, {
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

// TODO: replace with model testcases.
test('(500) must return an error when providing an email that is already being used', async t => {
  // Prepare
  const email = 'email@already-being-used.com';
  const user1 = { ...validPrefixedUserFixture('user1'), email };
  const user2 = { ...validPrefixedUserFixture('user2'), email };
  await new UsersModel(user1).save();

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: user2,
  })
  // Assert
  .catch(async error => {
    const { validator, ...err } = isAlreadyInUseValidator('email')(user2);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, user2));
  });
});

// TODO: replace with model testcases.
test(`(500) must return an error when providing an username that exceeds "${USERS_USERNAME_MAX_LENGTH}" characters`, async t => {
  // Prepare
  const userPayload = {
    ...validUserFixture,
    username: 'a'.repeat(USERS_USERNAME_MAX_LENGTH + 1)
  };

  // Execute
  await got.post(t.context.url, {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isTooLongValidator('username', USERS_USERNAME_MAX_LENGTH)(userPayload);
    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

// TODO: replace with model testcases.
test('(500) must return an error when providing an username that is already being used', async t => {
  // Prepare
  const username = 'already-being-used';
  const user1 = { ...validPrefixedUserFixture('user1'), username };
  const user2 = { ...validPrefixedUserFixture('user2'), username };
  await new UsersModel(user1).save();

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
