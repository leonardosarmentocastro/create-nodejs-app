const validUserFixture = {
  email: 'email@domain.com',
  username: 'username123'
};

// Must not include user's properties when updating, to properly isolate fields emptyness validations;
const validUserFixtureForTestcases = (t) => (t.context.endpointMethod === 'post' ? validUserFixture : {});

// Prefix all valid user properties values, to conveniently create new users using the same fixture.
const validPrefixedUserFixture = (prefix) => Object.entries(validUserFixture)
  .reduce((accumulator, [ key, value ]) => ({ ...accumulator, [key]: `${prefix}_${value}` }), {});

module.exports = {
  validPrefixedUserFixture,
  validUserFixture,
  validUserFixtureForTestcases,
};
