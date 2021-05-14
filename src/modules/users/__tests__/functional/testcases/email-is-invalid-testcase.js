const got = require('got');

const { invalidUserFixture, validUserFixtureForTestcases } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('@leonardosarmentocastro/i18n');
const { isValidEmailValidator } = require('@leonardosarmentocastro/validate');

exports.emailIsInvalidTestcase = {
  title: `(500) must return an error when providing an invalid email`,
  test: (t) => {
    const userPayload = {
      ...validUserFixtureForTestcases(t),
      email: invalidUserFixture.email,
    };

    return got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    })
    .catch(error => {
      const { validator, ...err } = isValidEmailValidator(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    })
  },
};
