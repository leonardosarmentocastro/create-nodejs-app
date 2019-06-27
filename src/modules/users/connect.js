const {
  createUserResolver,
  deleteUserResolver,
  findUserByIdResolver,
  updateUserResolver,
} = require('./resolvers');

exports.connect = (app) => {
  app.post('/users', createUserResolver);

  app.delete('/users/:id', deleteUserResolver);
  app.get('/users/:id', findUserByIdResolver);
  app.put('/users/:id', updateUserResolver);
}
