const {
  createUserResolver,
  deleteUserResolver,
  findUserByIdResolver,
  findUsersResolver,
  updateUserResolver,
} = require('./resolvers');

exports.connect = (app) => {
  app.get('/users', findUsersResolver); // TODO: connect with pagination middleware
  app.post('/users', createUserResolver);

  app.delete('/users/:id', deleteUserResolver);
  app.get('/users/:id', findUserByIdResolver);
  app.put('/users/:id', updateUserResolver);
};
