module.exports = {
  ...require('./create-user-resolver'),
  ...require('./delete-user-resolver'),
  ...require('./find-myself-resolver'),
  ...require('./find-user-by-id-resolver'),
  ...require('./find-users-resolver'),
  ...require('./update-user-resolver'),
};
