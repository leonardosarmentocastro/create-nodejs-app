const mysql = require("mysql2");
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


  await retry(() => mysql.createConnection({
    host    : process.env.MYSQL_HOST,
    port    : process.env.MYSQL_PORT,
    user    : process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE_NAME
  }), options).then(function(){
    const successMessage = getSuccessMessageForDatabaseConnection();
    return console.info(successMessage);
  })
    .catch(err => {
      const errorMessage = getErrorMessageForDatabaseConnection(err);
      return Promise.reject(errorMessage);
    });
};

 
