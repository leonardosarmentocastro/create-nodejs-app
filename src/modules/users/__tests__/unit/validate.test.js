const test = require('ava');

const { validate, isRequired } = require('../../validators');

const constraints = [ isRequired('email'), isRequired('username') ];
test('must return "code", "field", "message" fields of the first error it faces', async t => {
  const userDoc1 = { email: '', username: '' };
  const { validator: validator1, ...error1 } = isRequired('email')(userDoc1);
  t.deepEqual(await validate(constraints, userDoc1), error1);

  const userDoc2 = { email: 'email@domain.com', username: '' };
  const { validator: validator2, ...error2 } = isRequired('username')(userDoc2);
  t.deepEqual(await validate(constraints, userDoc2), error2);
});

test('must return "null" if no error was raised while checking constraints', async t => {
  const userDoc = { email: 'email@domain.com', username: 'username' };
  t.is(await validate(constraints, userDoc), null);
});
