const { getHealthResolver } = require('./resolvers');

exports.connect = (app) => {
  app.get('/', getHealthResolver);
  app.get('/health', getHealthResolver);
}
