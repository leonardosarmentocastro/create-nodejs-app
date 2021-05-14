const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');
const mongoose = require('mongoose');

const { database } = require('@leonardosarmentocastro/database');
const { userNotFoundTestcase } = require('./testcases');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort
} = require('../../../../__helpers__');
const { UsersModel } = require('../../model');
const { getUrl } = require('./__helpers__');
const { validUserFixture } = require('../__fixtures__');

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
  const user = { ...validUserFixture };
  const savedUser = (await new UsersModel(user).save()).toObject();

  const response = await got(getUrl(t, savedUser.id), getRequestOptions(t));

  t.assert(response.statusCode === 200);
  t.assert(response.body.id === savedUser.id);
  Object.keys(user)
    .filter(key => key !== 'password')
    .forEach(key => t.assert(response.body[key] === user[key]));
});

// Unhappy path tests
test(userNotFoundTestcase.title1, t => {
  const id = mongoose.Types.ObjectId();
  t.context.testcaseUrl = getUrl(t, id);

  return userNotFoundTestcase.test(t, id);
});
