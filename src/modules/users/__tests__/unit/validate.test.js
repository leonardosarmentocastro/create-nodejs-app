const test = require('ava');

const {
  validate,
  isEmailValid,
  isUsernameTooLong,
  USERNAME_MAX_LENGTH,
} = require('../../validators');

test('must return "code", "field", "message" fields of the first error it faces', async t => {
  const constraints = [
    isEmailValid,
    isUsernameTooLong,
  ];
  const userDoc = {
    constructor: {
      find: () => null,
    },
    email: 'invalid email@domain .com',
    username: 'a'.repeat(USERNAME_MAX_LENGTH),
  };

  const { validator, ...error } = isEmailValid(userDoc);
  t.deepEqual(await validate(constraints, userDoc), error);
});
