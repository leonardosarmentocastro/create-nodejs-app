const test = require('ava');

const { isEmailValid } = require('../../validators');

test('validator must return "false" if email is not valid', t => {
  [
    'invalid email@domain.com',
    'invalid@email@domain.com',
    'invalid@123!!!!.com.br'
  ].forEach(email => {
    const userDoc = { email };
    t.false(
      isEmailValid(userDoc).validator()
    );
  });
});
