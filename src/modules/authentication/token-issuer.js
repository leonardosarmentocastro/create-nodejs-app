const jwt = require('jsonwebtoken');

exports.authenticationTokenIssuer = {
  sign: (user) => jwt.sign(
    {
      payload: {}, // TODO: users "role"
    },
    process.env.AUTHENTICATION_SECRET,
    {
      expiresIn: '7 days',
      issuer: 'create-nodejs-app/authentication',
      subject: user.id,
    },
  )
};
