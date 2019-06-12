const test = require('ava');

const { isAlreadyInUse } = require('../../validators');

// Fixtures
const id = 'user1-already-in-database';
const field = 'email';
const value = 'email@domain.com';
const user = { id, [field]: value };

// Mocks
const find = (conditions) => {
  const { [field]: searchValue } = conditions;
  return (searchValue === value ? [ user ] : []);
};

test('validator must return "false" when "field" is already in use by another user', async t => {
  // Prepare
  const userDoc = {
    constructor: { find },
    id: 'user2-being-updated',
    [field]: value,
  };

  // Assert
  t.false(
    await isAlreadyInUse(field)(userDoc).validator()
  );
  t.true(
    await isAlreadyInUse(`not_${field}`)(userDoc).validator()
  );
});

test('validator must return "true" when "field" is not in use by another user but by himself', async t => {
  // Prepare
  const userDoc = {
    constructor: { find },
    id,
    [field]: value,
  };

  // Assert
  t.true(
    await isAlreadyInUse(field)(userDoc).validator()
  );
});
