const detectPort = require('detect-port');

const { server } = require('../../server');

// Start the API server on a random port, and save it into test context to tear it down later on.
exports.setupFunctionalTest = async (t, endpointOriginalPath) => {
  const availablePort = await detectPort();
  const baseUrl = `http://localhost:${availablePort}`;

  t.context.url = `${baseUrl}${endpointOriginalPath}`;
  t.context.api = await server.start(availablePort);
};
