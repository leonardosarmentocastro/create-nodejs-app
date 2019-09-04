const test = require('ava');
const got = require('got');
const jwt = require('jsonwebtoken');
const theOwl = require('the-owl');

const database = require('../../../../database');
const {} = require('../../');
const { UsersModel } = require('../../../users/model');
const { validUserFixture } = require('../../../users/__tests__/__fixtures__');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort,
} = require('../../../../__helpers__');

// Setup
test.before('prepare: start api / connect to database', async t => {
  t.context.endpointMethod = 'post';
  t.context.endpointOriginalPath = '/authentication/sign-up';

  await startApiOnRandomPort(t);
  await database.connect();
});
test.beforeEach('cleanup database', t => UsersModel.deleteMany());
test.after('create api docs (if enabled)', t => theOwl.createDocs());
test.after.always('teardown', t => closeApiOpenedOnRandomPort(t));

test('(200) must succeed on creating the user and signing a jwt token for it', async t => {
  const response = await got.post(t.context.endpointBaseUrl, {
    ...getRequestOptions(t),
    body: { ...validUserFixture },
  });

  const authenticationToken = response.headers.authorization;
  t.assert(response.statusCode == 200);
  t.truthy(authenticationToken);
  t.notThrows(() => jwt.verify(authenticationToken, process.env.AUTHENTICATION_SECRET));
});
