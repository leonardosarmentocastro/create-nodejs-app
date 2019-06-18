const got = require('got');

const { getRequestOptions, LOCALE } = require('../../../../__helpers__');
const { isRequiredValidator } = require('../../../../../shared');
const { translate } = require('../../../../../i18n');

exports.emptyEmailTestcase = {
  title: '(500) must return an error when providing an empty email',
  test: (t, { userPayload }) =>
    got(t.context.getUrl(t), { // TODO: will crash when using on "[post]" cause it doesn't uses "getUrl". Find a better option.
      ...getRequestOptions(t),
      body: userPayload,
      method: t.context.endpointMethod,
    })
    .catch(error => {
      const { validator, ...err } = isRequiredValidator('email')(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    })
};
