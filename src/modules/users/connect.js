const { createUserResolver, findByIdResolver } = require('./resolvers');

exports.connect = (app) => {
  app.get('/users/:id', findByIdResolver);
  app.post('/users', createUserResolver);
}
