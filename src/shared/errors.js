const { translate } = require('../i18n');

const SHARED_ERROR_UNEXPECTED = {
  code: 'SHARED_ERROR_UNEXPECTED',
  field: '',
};

const sharedUnexpectedError = (req, res, { err }) =>
  res.status(500).json({
    ...translate.error(SHARED_ERROR_UNEXPECTED, req.locale, {}),
    stacktrace: err.stack, // NOTE: "Error" interface contains "err.stack" prop.
  });

module.exports = {
  SHARED_ERROR_UNEXPECTED,
  sharedUnexpectedError,
};
