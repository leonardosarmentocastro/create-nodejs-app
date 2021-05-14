const { crud } = require('@leonardosarmentocastro/crud');
const { findMyselfResolver } = require('./resolvers');
const { UsersModel } = require('./model');

exports.connect = (app) => {
  crud.connect(app, UsersModel);

  app.route('/users/me')
    .get(findMyselfResolver);
};
