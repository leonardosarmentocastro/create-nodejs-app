const { signInResolver, signTokenResolver } = require('./resolvers');
const { UsersModel } = require('../users');
const { createResolver } = require('@leonardosarmentocastro/crud');

exports.connect = (app) => {
  app.post('/authentication/sign-in', signInResolver, signTokenResolver);
  app.post('/authentication/sign-up', createResolver(UsersModel), signTokenResolver);
};

// TODO: remove/erase
// exports.connect = (app) => {
//   app.post('/authentication/sign-in', {}, signInResolver, signTokenResolver);
//   app.post('/authentication/sign-up', createUserResolver, signTokenResolver);
// };
