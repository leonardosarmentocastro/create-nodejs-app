const { authenticationTokenIssuer } = require('../token-issuer');

// [RFC #MONOREPO-AUTHENTICATION]
// # What are aiming for
// Exposing the whole authentication module as a single dependency, the key usage points can be configured.
// # What we plan to change?
// The gotcha behind the exposed interface would be through `req.createdDoc || signedInUser`
// We give them the ability to pass their created/authenticated user through the `req` object.
// If they want to define their own prop name, e.g. `req.theirOwnUser`, we will let it happen through configuration.
// If they only interested on using the module on its most straight forward way, we use
// the ones we have seem on code so far: `req.createdDoc || req.signedInUser`.
const signTokenResolver = async (req, res) => {
  const user = req.createdDoc || req.signedInUser;
  const authenticationToken = authenticationTokenIssuer.sign(user);
  res.set('Authorization', authenticationToken);

  res.end();
};

module.exports = { signTokenResolver };
