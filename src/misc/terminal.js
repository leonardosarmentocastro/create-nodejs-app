const chalk = require('chalk');

const terminal = {
  bgPurple: chalk.bgHex('#A359ED'),
  errorBg: chalk.bgHex('#ba1912'),
  infoBg: chalk.bgWhite,
  successBg: chalk.bgHex('#046824'),
  warningBg: chalk.bgHex('#F5A623'),
  textPrimary: chalk.gray,
  textSecondary: chalk.white,
};

module.exports = terminal;
