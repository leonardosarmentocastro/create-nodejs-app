// CONVENTION: Re-export each module.
module.exports = {
  authentication: { ...require('./authentication') },
  users: { ...require('./users') },
};
