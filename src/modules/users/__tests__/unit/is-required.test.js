const test = require('ava');

const { isRequired } = require('../../validators');

test('validator must return "false" if specified field is empty', t => {
  const userDoc = {
    email: '',
    username: 'not empty',
  };

  t.falsy(
    isRequired('email')(userDoc).validator()
  );
  t.truthy(
    isRequired('username')(userDoc).validator()
  );
});
