const got = require('got');

const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('@leonardosarmentocastro/i18n');
const { ERROR_DOCUMENT_NOT_FOUND } = require('@leonardosarmentocastro/crud');

exports.userNotFoundTestcase = {
  title1: "(500) must return a translated error if the user was not found",
  title2: '(500) must return a translated error when deleting an user with an invalid mongo "id"',
  test: (t, id) =>
    got(t.context.testcaseUrl, getRequestOptions(t))
      .catch(error => {
        const err = ERROR_DOCUMENT_NOT_FOUND;
        const args = { id };

        t.assert(error.response.statusCode === 500);
        t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
      }),
};
