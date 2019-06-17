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
const { UsersModel, USERS_USERNAME_MAX_LENGTH } = require('../../model');
const { SCHEMA_NOT_SETTABLE_FIELDS } = require('../../../../shared');
const {
  isAlreadyInUseValidator,
  isValidEmailValidator,
  isRequiredValidator,
  isTooLongValidator,
} = require('../../../../shared');

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
[
  { field: 'email', value: 'new-email@domain.com' },
  { field: 'username', value: 'new-username' },
].forEach(({ field, value }) => {
  test(`(200) must succeed on updating the field "${field}" and always return the full updated document`, async t => {
    // Prepare
    const userPayload = { [field]: value };

    // Execute
    const response = await got.put(getUrl(t), {
      ...getRequestOptions(t),
      body: userPayload,
    });

    // Assert
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

test('(200) must be idempotent when updating without setting new values to fields', async t => {
  // Prepare
  const { email, username } = t.context.user;
  const userPayload = { email, username };

  // Execute
  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  });

  // Assert
  const updatedUser = response.body;
  t.assert(response.statusCode === 200);
  t.not(updatedUser.updatedAt, t.context.user.updatedAt); // "updatedAt" must have a new value
});

test(`(200) The fields "${SCHEMA_NOT_SETTABLE_FIELDS.toString()}" must not be updatable`, async t => {
  // Prepare
  const notSettableFields = SCHEMA_NOT_SETTABLE_FIELDS
    .reduce((accumulator, field) => ({ ...accumulator, [field]: 'value' }), {});
  const userPayload = { ...notSettableFields };

  // Execute
  const response = await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  });

  // Assert
  const updatedUser = response.body;
  t.assert(response.statusCode === 200);
  SCHEMA_NOT_SETTABLE_FIELDS
    .forEach(key =>
      t.assert(updatedUser[key] !== notSettableFields[key])
    );
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
    const { validator, ...err } = isRequiredValidator('email')(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

test('(500) must return an error when providing an invalid email', async t => {
  // Prepare
  const userPayload = { email: 'invalid@123!!!!.com.br' };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isValidEmailValidator(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

test('(500) must return an error when providing an email that is already being used', async t => {
  // Prepare
  const email = 'email@already-being-used.com';
  const createdUser = { email, username: 'random_username' };
  await UsersModel.create(createdUser);

  const userPayload = { email };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isAlreadyInUseValidator('email')(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

test('(500) must return an error when providing an empty username', async t => {
  // Prepare
  const userPayload = { username: '' };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isRequiredValidator('username')(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

test(`(500) must return an error when providing an username that exceeds "${USERS_USERNAME_MAX_LENGTH}" characters`, async t => {
  // Prepare
  const userPayload = { username: 'a'.repeat(USERS_USERNAME_MAX_LENGTH + 1) };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isTooLongValidator('username', )(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});

test('(500) must return an error when providing an username that is already being used', async t => {
  // Prepare
  const username = `username_being_used`;
  const createdUser = { email: 'email@not-being-used.com', username };
  await UsersModel.create(createdUser);

  const userPayload = { username };

  // Execute
  await got.put(getUrl(t), {
    ...getRequestOptions(t),
    body: userPayload,
  })
  // Assert
  .catch(error => {
    const { validator, ...err } = isAlreadyInUseValidator('username')(userPayload);

    t.assert(error.response.statusCode == 500);
    t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
  });
});
