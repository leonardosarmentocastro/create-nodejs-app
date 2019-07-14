const {
  createUserResolver,
  deleteUserResolver,
  findUserByIdResolver,
  findUsersResolver,
  updateUserResolver,
} = require('./resolvers');
const { paginationMiddleware } = require('../../shared');

exports.connect = (app) => {
  app.get('/users', paginationMiddleware, findUsersResolver);
  app.post('/users', createUserResolver);

  app.delete('/users/:id', deleteUserResolver);
  app.get('/users/:id', findUserByIdResolver);
  app.put('/users/:id', updateUserResolver);
};
