const test = require('ava');

const database = require('../../../../database');
const { UsersModel } = require('../../model');

test.before('setup database connection/delete all users', async t => {
  await database.connect();
  await UsersModel.deleteMany({});
});

const getUsersSavedOnDatabase = () => UsersModel.find({});
test('user creation must succeeds', async t => {
  t.assert((await getUsersSavedOnDatabase()).length === 0);

  await new UsersModel({
    email: 'email@domain.com',
    username: 'username-123',
  }).save();

  t.assert((await getUsersSavedOnDatabase()).length === 1);
});
