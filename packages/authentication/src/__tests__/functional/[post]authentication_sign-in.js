const test = require('ava');
const got = require('got');
const jwt = require('jsonwebtoken');
const theOwl = require('the-owl');

const { database } = require('@leonardosarmentocastro/database');
const {
  AUTHENTICATION_ERROR_EMAIL_NOT_FOUND,
  AUTHENTICATION_ERROR_PASSWORD_MISMATCH,
} = require('../../errors');
const { translate } = require('@leonardosarmentocastro/i18n');
const { UsersModel } = require('../../../users/model');
const { isRequiredValidator } = require('@leonardosarmentocastro/validate');
const { validUserFixture } = require('../../../users/__tests__/__fixtures__');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
  LOCALE
} = require('../../../../__helpers__');

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointMethod = 'post';
  t.context.endpointOriginalPath = '/authentication/sign-in';

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
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

// Happy path tests
const getUsersSavedOnDatabase = () => UsersModel.find({});
test('(200) must succeed on authenticating the user and signing a jwt token for it', async t => {
  t.assert((await getUsersSavedOnDatabase()).length === 1);

  const { email, password } = validUserFixture;
  const response = await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: { email, password },
  });

  t.assert(response.statusCode == 200);
  t.assert((await getUsersSavedOnDatabase()).length === 1);

  const authenticationToken = response.headers.authorization;
  t.truthy(authenticationToken);
  t.notThrows(() => jwt.verify(authenticationToken, process.env.AUTHENTICATION_SECRET));
});

// Unhappy path tests
[ 'email', 'password' ].forEach(field => {
  test(`(400) must return an error when not providing the field "${field}" on request body`, async t => {
    const { email, password } = validUserFixture;
    const authenticationPayload = { email, password, [field]: undefined };

    await got.post(t.context.endpointBaseUrl, {
      ...getRequestOptions(t),
      body: authenticationPayload,
    })
    .catch(error => {
      const { validator, ...err } = isRequiredValidator(field)(authenticationPayload);
      t.assert(error.response.statusCode == 400);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, {}));
    });
  });
});

test('(404) must return an error when providing an "email" that is not registered for any user', async t => {
  const email = `not-${validUserFixture.email}`;
  const { password } = validUserFixture;

  await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: { email, password },
  })
  .catch(error => {
    t.assert(error.response.statusCode == 404);
    t.deepEqual(error.response.body, translate.error(AUTHENTICATION_ERROR_EMAIL_NOT_FOUND, LOCALE, {}));
  });
});

test('(404) must return an error when providing a "password" that mismatches user\'s password', async t => {
  const password = `not-${validUserFixture.password}`;
  const { email } = validUserFixture;

  await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: { email, password },
  })
  .catch(error => {
    t.assert(error.response.statusCode == 404);
    t.deepEqual(error.response.body, translate.error(AUTHENTICATION_ERROR_PASSWORD_MISMATCH, LOCALE, {}));
  });
});
