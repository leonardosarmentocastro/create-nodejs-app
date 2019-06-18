const validUserFixture = {
  email: 'email@domain.com',
  username: 'username123'
};

const validPrefixedUserFixture = (prefix) => Object.entries(validUserFixture)
  .reduce((accumulator, [ key, value ]) => ({ ...accumulator, [key]: `${prefix}_${value}` }), {});

module.exports = { validUserFixture, validPrefixedUserFixture };
