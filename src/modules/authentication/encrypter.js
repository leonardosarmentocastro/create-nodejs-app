const upash = require('upash');
upash.install('pbkdf2', require('@phc/pbkdf2'));

const DEFAULT = { __upash: upash };

// TODO: Unit test?
// Reference: https://github.com/simonepri/phc-pbkdf2
exports.authenticationEncrypter = ({ __upash } = DEFAULT) => ({
  hash: async (password) => {
    const phcstr = await __upash.hash(password);
    return phcstr;
  },
  verify: async (phcstr, password) => {
    const hasMatched = await __upash.verify(phcstr, password);
    return hasMatched;
  },
});
