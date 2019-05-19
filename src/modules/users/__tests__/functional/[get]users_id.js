const test = require('ava');
const got = require('got');
const theOwl = require('the-owl');
const mongoose = require('mongoose');

const database = require('../../../../database');
const {
  closeApiOpenedOnRandomPort,
  getRequestOptions,
  startApiOnRandomPort
} = require('../../../__helpers__');
const { userNotFoundError } = require('../../errors');
const { UsersModel } = require('../../model');

const endpointOriginalPath = '/users/:id';
test.before(async t => {
  await startApiOnRandomPort(t, endpointOriginalPath);
  await database.connect();
});
test.beforeEach(t => UsersModel.deleteMany());
test.after(t => theOwl.createDocs());
test.after.always(t => closeApiOpenedOnRandomPort(t));

test('(200) must return the user saved on database if it exists', async t => {
  const user = { email: 'email@domain.com', username: 'username' };
  const savedUser = (await new UsersModel(user).save()).toObject();

  const url = t.context.url.replace(':id', savedUser.id);
  const response = await got(url, getRequestOptions(t, endpointOriginalPath));

  t.assert(response.statusCode === 200);
  t.assert(response.body.id === savedUser.id);
  Object.keys(user)
    .forEach(key => t.assert(response.body[key] === user[key]));
});

test('(500) must return an error if the user doesn\'t exist', async t => {
  const userId = mongoose.Types.ObjectId();
  const url = t.context.url.replace(':id', userId);
  await got(url, getRequestOptions(t, endpointOriginalPath))
    .catch(error => {
      t.assert(error.response.statusCode === 500);
      t.deepEqual(error.response.body, userNotFoundError(userId));
    });
});
