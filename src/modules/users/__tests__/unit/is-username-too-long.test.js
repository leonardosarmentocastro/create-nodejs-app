const test = require('ava');

const { USERNAME_MAX_LENGTH, isUsernameTooLong } = require('../../validators');

test(`validator must return "false" when username has more than ${USERNAME_MAX_LENGTH} characters`, t => {
  const userDoc = { username: 'a'.repeat(USERNAME_MAX_LENGTH + 1) };
  t.false(
    isUsernameTooLong(userDoc).validator()
  );
});
