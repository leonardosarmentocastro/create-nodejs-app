const authentication = require('@leonardosarmentocastro/authentication');
const { UsersModel } = require('../users');

exports.connect = (app) => {
  authentication.connect(app, UsersModel);
};
