const chalk = require('chalk');

const ctx = new chalk.Instance({ level: 3 }); // Override "--no-color" from AVA.
const terminal = {
  bgPurple: ctx.bgHex('#A359ED'),
  errorBg: ctx.bgHex('#ba1912'),
  infoBg: ctx.bgWhite,
  successBg: ctx.bgHex('#046824'),
  warningBg: ctx.bgHex('#F5A623'),
  textPrimary: ctx.gray,
  textSecondary: ctx.white,
};

module.exports = terminal;
