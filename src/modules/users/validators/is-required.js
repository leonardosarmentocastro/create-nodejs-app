exports.isRequired = (field) => (userDoc) => ({
  code: 'USERS_ERROR_FIELD_IS_REQUIRED',
  field,
  validator: () => !!userDoc[field], // CONVENTION: Returned value must refer to "isValid" check.
});
