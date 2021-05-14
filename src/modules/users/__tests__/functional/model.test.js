const test = require('ava');

const { database } = require('@leonardosarmentocastro/database');
const { UsersModel } = require('../../model');

test.before(t => database.connect());
test.beforeEach(t => UsersModel.deleteMany({}))

const getUsersSavedOnDatabase = () => UsersModel.find({});
test('user creation must succeeds', async t => {
  t.assert((await getUsersSavedOnDatabase()).length === 0);

  await new UsersModel({
    email: 'email@domain.com',
    username: 'username-123',
    password: 'abc123def!@#' // score 3
  }).save();

  t.assert((await getUsersSavedOnDatabase()).length === 1);
});
