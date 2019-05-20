exports.isEmailAlreadyInUse = (userDoc) => ({
  code: 'USERS_ERROR_EMAIL_ALREADY_IN_USE',
  field: 'email',
  validator: async () => {
    const model = userDoc.constructor;
    const users = await model.find({ email: userDoc.email });

    const isValid = (users.length === 0);
    return isValid;
  }
});
