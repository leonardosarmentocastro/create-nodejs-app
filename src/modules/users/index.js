// CONVENTION: Always export module's "connect" function.
module.exports = {
  ...require('./connect'),
  ...require('./model'),
  ...require('./resolvers'),
};
