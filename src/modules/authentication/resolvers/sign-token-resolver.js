const { authenticationTokenIssuer } = require('../token-issuer');

const signTokenResolver = async (req, res) => {
  const user = req.createdUser || req.signedInUser;
  const authenticationToken = authenticationTokenIssuer.sign(user);
  res.set('Authorization', authenticationToken);

  res.end();
};

module.exports = { signTokenResolver };
