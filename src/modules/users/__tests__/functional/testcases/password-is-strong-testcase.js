const got = require('got');

const { invalidUserFixture, validUserFixtureForTestcases } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('@leonardosarmentocastro/i18n');
const { isPasswordStrongValidator } = require('@leonardosarmentocastro/validate');

exports.passwordIsStrongTestcase = {
  title: '(500) must return an error when providing a "password" that is not strong enough',
  test: (t) => {
    const userPayload = {
      ...validUserFixtureForTestcases(t),
      password: invalidUserFixture.password,
    };

    return got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: userPayload,
    })
    .catch(error => {
      const { validator, ...err } = isPasswordStrongValidator(userPayload);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, userPayload));
    })
  },
};
