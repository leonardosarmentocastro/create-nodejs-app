const { signTokenResolver } = require('./resolvers');
const { createUserResolver } = require('../users');

exports.connect = (app) => {
  app.post('/authentication/sign-up', createUserResolver, signTokenResolver);
};
