const test = require('ava');

const { isUsernameAlreadyInUse } = require('../../validators');

test('validator must return "false" when username is already in use by another user', async t => {
  const username = 'username@domain.com';
  const user = { username };
  const userDoc = {
    constructor: {
      find: () => [ user ]
    },
    username,
  };

  t.false(
    await isUsernameAlreadyInUse(userDoc).validator()
  );
});
