const theOwl = require('the-owl');

const timeout = 1000;
exports.getRequestOptions = (t, endpointOriginalPath) => ({
  headers: { ...theOwl.buildHeaders(t.title, endpointOriginalPath) },
  json: true,
  timeout,
});
