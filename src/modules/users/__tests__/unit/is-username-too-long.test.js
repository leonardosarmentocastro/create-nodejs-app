const test = require('ava');

const { USERNAME_MAX_LENGTH, isUsernameTooLong } = require('../../validators');

test(`validator must return "false" when username has more than ${USERNAME_MAX_LENGTH} characters`, async t => {
  const username = 'a'.repeat(USERNAME_MAX_LENGTH + 1);
  const userDoc = { username };

  t.falsy(
    await isUsernameTooLong(userDoc).validator()
  );
});
