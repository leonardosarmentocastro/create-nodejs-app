const {
  errorBg,
  infoBg,
  successBg,
  bgPurple,
  textPrimary,
  textSecondary
} = require('../misc/terminal');

const isProduction = (process.env.NODE_ENV === 'production');
const connectedOnURI = (database) => isProduction ? '' : `URI: "${textSecondary(database.CONNECTION_STRING)}"`;

exports.getErrorMessageForDatabaseConnection = (err, database) => {
  const message = [
    [ // line 1
      errorBg.white('  ERROR  '),
      `${textPrimary(`Failed to connect to database:${database.name}: ${connectedOnURI(database)}`)}`.trim(),

    ].join(' '),
    [ // line 2
      `${infoBg.black('  STACKTRACE  ')}`,
      `${textPrimary(err)}`,
    ].join(' '),
  ].join('\r\n');

  return message;
};

exports.getInfoMessageForRetryingToConnect = (retries, retryCount, retryInSeconds) => {
  const message = [
    bgPurple.white('  DATABASE NOT READY  '),
      `${textPrimary('Failed to connect to database. Retry')} ${textSecondary(`${retryCount} of ${retries}`)}.`,
      `${textPrimary('Retrying in')} ${textSecondary(retryInSeconds)} seconds.`,
    ].join(' ');

  return message;
};

exports.getSuccessMessageForDatabaseConnection = (database) => {
  const message = [
    `${successBg.white('  CONNECTED  ')}`,
    `${textPrimary(`Connection to "${database.name}" was stablished.`)}`.trim(),
  ].join(' ');

  return message;
};
