const { getHealthResolver } = require('./resolvers');

exports.connect = (app) => {
  app.get('/health', getHealthResolver);
}
