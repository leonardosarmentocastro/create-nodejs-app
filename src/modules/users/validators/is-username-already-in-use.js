exports.isUsernameAlreadyInUse = (userDoc) => ({
  code: 'USERS_ERROR_USERNAME_ALREADY_IN_USE',
  field: 'username',
  validator: async () => {
    const model = userDoc.constructor;
    const users = await model.find({ username: userDoc.username });

    const isValid = (users.length === 0);
    return isValid;
  }
});
