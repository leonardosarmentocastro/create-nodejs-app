const theOwl = require('the-owl');

const { LOCALE, TIMEOUT } = require('./constants');

exports.getRequestOptions = (t, endpointOriginalPath) => ({
  headers: {
    'accept-language': LOCALE,
    ...theOwl.buildHeaders(t.title, endpointOriginalPath)
  }, // Generate API docs based on functional test results.
  json: true, // Automatically parses "response.body": https://github.com/sindresorhus/got/issues/174#issuecomment-298292987
  timeout: TIMEOUT,
});
