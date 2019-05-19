const theOwl = require('the-owl');

const timeout = 1000;
exports.getRequestOptions = (t, endpointOriginalPath) => ({
  headers: { ...theOwl.buildHeaders(t.title, endpointOriginalPath) }, // Generate API docs based on functional test results.
  json: true, // Automatically parses "response.body": https://github.com/sindresorhus/got/issues/174#issuecomment-298292987
  timeout,
});
