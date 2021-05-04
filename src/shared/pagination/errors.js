const { translate } = require('@leonardosarmentocastro/i18n');

exports.SHARED_PAGINATION_ERROR_QUERY_PARAMETER_INVALID = {
  code: 'SHARED_PAGINATION_ERROR_QUERY_PARAMETER_INVALID',
};

exports.paginationTranslatedValidationError = (req, res, { err }) =>
  res.status(500).json(
    translate.error(err, req.locale, {})
  );
