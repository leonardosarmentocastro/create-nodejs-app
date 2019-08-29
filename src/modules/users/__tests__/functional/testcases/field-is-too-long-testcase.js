const got = require('got');

const { validUserFixtureForTestcases } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('../../../../../i18n');
const { isTooLongValidator } = require('../../../../../shared');

exports.fieldIsTooLongTestcase = (field, maxLength) => ({
  title: `(500) must return a translated error when providing a "${field}" that exceeds "${maxLength}" characters`,
  test: (t) => {
    const userPayload = {
      ...validUserFixtureForTestcases(t),
      [field]: 'a'.repeat(maxLength + 1)
    };

    return got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    })
    .catch(error => {
      console.log('@@@ DEBUGGING: error', error);

      const { validator, ...err } = isTooLongValidator(field, maxLength)(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    });
  },
});
