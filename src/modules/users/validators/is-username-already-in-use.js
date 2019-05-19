exports.isUsernameAlreadyInUse = (userDoc) => ({
  code: 'USERNAME_ALREADY_IN_USE',
  field: 'username',
  message: `The username "${userDoc.username}" is already in use.`, // TODO: i18n,
  validator: async () => {
    const model = userDoc.constructor;
    const users = await model.find({ username: userDoc.username });

    const isValid = (users.length === 0);
    return isValid;
  }
});
