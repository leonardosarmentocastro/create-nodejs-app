const got = require('got');

const { getRequestOptions, LOCALE } = require('../../../../__helpers__');
const { USERS_ERROR_USER_NOT_FOUND } = require('../../../errors');
const { translate } = require('../../../../../i18n');

exports.userNotFoundTestcase = {
  title1: "(500) must return a translated error if the user was not found",
  title2: '(500) must return a translated error when searching for an user with an invalid mongo "id"',
  test: (t, userId) =>
    got(t.context.testcaseUrl, getRequestOptions(t))
      .catch(error => {
        const err = USERS_ERROR_USER_NOT_FOUND;
        const args = { userId };

        t.assert(error.response.statusCode === 500);
        t.deepEqual(error.response.body, translate.error(err, LOCALE, args));
      }),
};
