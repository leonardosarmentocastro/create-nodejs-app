exports.isAlreadyInUse = (field) => (userDoc) => ({
  code: 'USERS_ERROR_FIELD_ALREADY_IN_USE',
  field,
  validator: async () => {
    const model = userDoc.constructor;
    const users = await model.find({ [field]: userDoc[field] });

    // Both "create" and "update" operations run validations appended to ".save" method.
    // We **must** validate both cases, cause if you create an user with username "username123" and
    // update any any other field later on, the update operation would not be successful due to
    // the username field being used by yourself.
    const isBeingUsedBySomeone = (users.length !== 0); // create operation
    const isBeingUsedByMe = users.some(user => user.id === userDoc.id); // update operation

    const isValid = (!isBeingUsedBySomeone || isBeingUsedByMe);
    return isValid;
  },
});
