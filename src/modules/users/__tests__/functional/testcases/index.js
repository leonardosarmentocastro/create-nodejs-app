module.exports = {
  ...require('./email-is-invalid-testcase'),
  ...require('./field-is-already-in-use-testcase'),
  ...require('./field-is-empty-testcase'),
  ...require('./field-is-too-long-testcase'),
  ...require('./not-settable-fields-are-ignored-testcase'),
  ...require('./user-not-found-testcase'),
};