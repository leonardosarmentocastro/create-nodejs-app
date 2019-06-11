const {
  createUserResolver,
  findByIdResolver,
  updateUserResolver,
} = require('./resolvers');

exports.connect = (app) => {
  app.get('/users/:id', findByIdResolver);
  app.post('/users', createUserResolver);
  app.put('/users/:id', updateUserResolver);
}
