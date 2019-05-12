const mongoose = require('mongoose');
const retry = require('async-retry')

const { CONNECTION_STRING } = require('./connection-string');
const {
  getErrorMessageForDatabaseConnection,
  getInfoMessageForRetryingToConnect,
  getSuccessMessageForDatabaseConnection
} = require('./messages');

exports.connect = async () => {
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

  await retry(() => mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true }), options)
    .catch(err => {
      const errorMessage = getErrorMessageForDatabaseConnection(err);
      return Promise.reject(errorMessage);
    });

  const successMessage = getSuccessMessageForDatabaseConnection();
  return console.info(successMessage);
};
