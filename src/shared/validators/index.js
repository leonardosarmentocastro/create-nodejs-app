// [RFC #MONOREPO-SHARED-VALIDATE]
// This module has so much power, everything about error detection/handling/translation is drived by this strategy.
// The key gotcha would be to expose `validate()` function and its commons most used `validators`, to show off
// how error handling show be addressed an reused on modules.
module.exports = {
  ...require('./is-already-in-use-validator'),
  ...require('./is-required-validator'),
  ...require('./is-too-long-validator'),
  ...require('./is-valid-email-validator'),
};
