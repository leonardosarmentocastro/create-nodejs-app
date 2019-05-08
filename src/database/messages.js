const {
  errorBg,
  infoBg,
  successBg,
  bgPurple,
  textPrimary,
  textSecondary
} = require('../misc/terminal');

const { CONNECTION_STRING } = require('./connection-string');

exports.getErrorMessageForDatabaseConnection = (err) => {
  const message = [
    [ // line 1
      errorBg.white('  ERROR  '),
      `${textPrimary('Failed to connect to database on URI:')} "${textSecondary(CONNECTION_STRING)}"`,
    ].join(' '),
    [ // line 2
      `${infoBg.black('  STACKTRACE  ')}`,
      `${textPrimary(err)}`,
    ].join(' '),
  ].join('\r\n');

  return message;
};

exports.getInfoMessageForRetryingToConnect = (retries, retryCount, retryInSeconds) => {
  const message = [
    bgPurple.white('  DATABASE NOT READY '),
      `${textPrimary('Failed to connect to database. Retry')} ${textSecondary(`${retryCount} of ${retries}`)}.`,
      `${textPrimary('Retrying in')} ${textSecondary(retryInSeconds)} seconds.`,
    ].join(' ');

  return message;
}

exports.getSuccessMessageForDatabaseConnection = () => {
  const message = [
    `${successBg.white('  CONNECTED  ')}`,
    `${textPrimary('Connection to MongoDB was stablished on URI:')} "${textSecondary(CONNECTION_STRING)}"`,
  ].join(' ');

  return message;
}