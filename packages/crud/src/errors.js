const { translate } = require('@leonardosarmentocastro/i18n');

// const USERS_ERROR_USER_NOT_FOUND = {
//   code: 'USERS_ERROR_USER_NOT_FOUND',
//   field: 'id',
// };

// const userNotFoundError = (req, res) =>
//   res.status(500).json(
//     translate.error(USERS_ERROR_USER_NOT_FOUND, req.locale, { userId: req.params.id })
//   );

const translatedError = (req, res, { err, doc }) => {
  const transformedDoc = doc.toObject();
  const error = translate.error(err, req.locale, transformedDoc);

  return res.status(500).json(error);
};

module.exports = {
  // USERS_ERROR_USER_NOT_FOUND,
  // userNotFoundError,
  translatedError,
};
