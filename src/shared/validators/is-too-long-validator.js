exports.isTooLongValidator = (field, maxLength) => (doc) => ({
  code: 'SHARED_ERROR_FIELD_IS_TOO_LONG',
  field,
  validator: () => {
    const isValid = (doc.username.length <= maxLength);
    return isValid;
  },
});
