const detectPort = require('detect-port');

const { server } = require('../../server');

exports.startApiOnRandomPort = async (t, endpointOriginalPath) => {
  const availablePort = await detectPort();
  const baseUrl = `http://localhost:${availablePort}`;

  // Save API reference into test context to close it later on.
  t.context.url = `${baseUrl}${endpointOriginalPath}`;
  t.context.api = await server.start(availablePort);
};
