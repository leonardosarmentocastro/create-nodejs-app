const got = require('got');

const { validUserFixture } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../__helpers__');
const { translate } = require('../../../../../i18n');
const { isTooLongValidator } = require('../../../../../shared');

exports.fieldIsTooLongTestcase = (field, maxLength) => ({
  title: `(500) must return a translated error when providing a "${field}" that exceeds "${maxLength}" characters`,
  test: async (t) => {
    // Must include all user's properties when creating, to isolate the field emptyness validation.
    const isCreatingAnUser = (t.context.endpointMethod.toLowerCase() === 'post');
    const userPayload = {
      ...(isCreatingAnUser ? validUserFixture : {}),
      [field]: 'a'.repeat(maxLength + 1)
    };

    await got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    })
    .catch(error => {
      const { validator, ...err } = isTooLongValidator(field, maxLength)(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    });
  },
});
