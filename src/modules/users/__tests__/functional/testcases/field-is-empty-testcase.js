const got = require('got');

const { validUserFixture } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../__helpers__');
const { translate } = require('../../../../../i18n');
const { isRequiredValidator } = require('../../../../../shared');

exports.fieldIsEmptyTestcase = (field) => ({
  title: `(500) must return a translated error when providing an empty "${field}"`,
  test: (t) => {
    // Must include all user's properties when creating, to isolate the field emptyness validation.
    const isCreatingAnUser = (t.context.endpointMethod.toLowerCase() === 'post');
    const userPayload = {
      ...(isCreatingAnUser ? validUserFixture : {}),
      [field]: '',
    };

    return got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    })
    .catch(error => {
      const { validator, ...err } = isRequiredValidator(field)(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    })
  },
});
