exports.isEmailAlreadyInUse = (userDoc) => ({
  code: 'EMAIL_ALREADY_IN_USE',
  field: 'email',
  message: `The email "${userDoc.email}" is already in use.`, // TODO: i18n,
  validator: async () => {
    const model = userDoc.constructor;
    const users = await model.find({ email: userDoc.email });

    const isValid = (users.length === 0);
    return isValid;
  }
});
