const got = require('got');

const { validUserFixtureForTestcases } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('../../../../../i18n');
const { isRequiredValidator } = require('../../../../../shared');

exports.fieldIsEmptyTestcase = (field) => ({
  title: `(500) must return a translated error when providing an empty "${field}"`,
  test: (t) => {
    const userPayload = {
      ...validUserFixtureForTestcases(t),
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
    });
  },
});
