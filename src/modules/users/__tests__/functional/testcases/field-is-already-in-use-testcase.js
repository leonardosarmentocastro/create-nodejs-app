const got = require('got');

const { validPrefixedUserFixture } = require('../../__fixtures__');
const { getRequestOptions, LOCALE } = require('../../../../../__helpers__');
const { translate } = require('@leonardosarmentocastro/i18n');
const { UsersModel } = require('../../../model');
const { isAlreadyInUseValidator } = require('../../../../../shared');

exports.fieldIsAlreadyInUseTestcase = (field, value) => ({
  title: `(500) must return a translated error when "${field}" is already in use by another user`,
  test: async (t) => {
    const user1 = { ...validPrefixedUserFixture('user1'), [field]: value };
    const user2 = { ...validPrefixedUserFixture('user2'), [field]: value };
    await new UsersModel(user1).save();

    return got(t.context.testcaseUrl, {
      ...getRequestOptions(t),
      body: user2,
    })
    .catch(async error => {
      const { validator, ...err } = isAlreadyInUseValidator(field)(user2);
      t.assert(error.response.statusCode == 500);
      t.deepEqual(error.response.body, translate.error(err, LOCALE, user2));
    });
  },
});
