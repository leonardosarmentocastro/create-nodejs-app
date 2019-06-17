exports.isRequiredValidator = (field) => (doc) => ({
  code: 'SHARED_ERROR_FIELD_IS_REQUIRED',
  field,
  validator: () => {
    const isValid = !!doc[field];
    return isValid;
  },
});
