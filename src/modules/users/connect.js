const {
  createUserResolver,
  deleteUserResolver,
  findMyselfResolver,
  findUserByIdResolver,
  findUsersResolver,
  serveCreatedUserResolver,
  updateUserResolver,
} = require('./resolvers');
const { paginationMiddleware } = require('../../shared');

exports.connect = (app) => {
  app.route('/users')
    .get(paginationMiddleware, findUsersResolver)
    .post(createUserResolver, serveCreatedUserResolver);

  app.route('/users/me')
    .get(findMyselfResolver);

  app.route('/users/:id')
    .delete(deleteUserResolver)
    .get(findUserByIdResolver)
    .put(updateUserResolver);
};
