// CONVENTION: Re-export each module.
module.exports = {
  health: { ...require('./health') },
  users: { ...require('./users') },
};
