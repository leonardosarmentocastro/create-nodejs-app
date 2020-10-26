const retry = require('async-retry')

const {
  getErrorMessageForDatabaseConnection,
  getInfoMessageForRetryingToConnect,
  getSuccessMessageForDatabaseConnection
} = require('./messages');

exports.connectToDatabase = async (connect, database) => {
  let retryCount = 0;
  const retries = 5;
  const minTimeout = 3000;
  const retryInSeconds = minTimeout / 1000;
  const options = {
    minTimeout,
    retries,
    onRetry: () => {
      retryCount++;

      const infoMessage = getInfoMessageForRetryingToConnect(retries, retryCount, retryInSeconds);
      console.info(infoMessage);
    },
  };

  const db = await retry(connect, options)
    .catch(err => {
      const errorMessage = getErrorMessageForDatabaseConnection(err, database);
      return Promise.reject(errorMessage);
    });

  const successMessage = getSuccessMessageForDatabaseConnection(database);
  console.info(successMessage);

  return db;
};
