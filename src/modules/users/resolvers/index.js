module.exports = {
  ...require('./create-user-resolver'),
  ...require('./delete-user-resolver'),
  ...require('./find-user-by-id-resolver'),
  ...require('./update-user-resolver'),
};
