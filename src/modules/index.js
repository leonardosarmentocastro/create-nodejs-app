// CONVENTION: Re-export each module.
module.exports = {
  authentication: { ...require('./authentication') },
  health: { ...require('./health') },
  users: { ...require('./users') },
};
