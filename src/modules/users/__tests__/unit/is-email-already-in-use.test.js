const test = require('ava');

const { isEmailAlreadyInUse } = require('../../validators');

test('validator must return "false" when email is already in use by another user', async t => {
  const email = 'email@domain.com';
  const user = { email };
  const userDoc = {
    constructor: {
      find: () => [ user ]
    },
    email,
  };

  t.falsy(
    await isEmailAlreadyInUse(userDoc).validator()
  );
});
