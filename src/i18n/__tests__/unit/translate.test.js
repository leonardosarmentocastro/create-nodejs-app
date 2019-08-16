const test = require('ava');

const { isRequiredValidator } = require('../../../shared/validators');
const { translate } = require('../../translate');

const LOCALE_PRIMARY = 'en-us';
const LOCALE_SECONDARY = 'pt-br';
const LOCALES = [ LOCALE_PRIMARY, LOCALE_SECONDARY ];
const TRANSLATION_KEYS = [
  'AUTHORIZATION_INVALID_TOKEN_ERROR',
  'SHARED_ERROR_EMAIL_INVALID',
  'SHARED_ERROR_FIELD_ALREADY_IN_USE',
  'SHARED_ERROR_FIELD_IS_REQUIRED',
  'SHARED_ERROR_FIELD_IS_TOO_LONG',
  'SHARED_ERROR_UNEXPECTED',
  'SHARED_PAGINATION_ERROR_QUERY_PARAMETER_INVALID',
  'USERS_ERROR_USER_NOT_FOUND',
];

TRANSLATION_KEYS.forEach(translationKey => {
  LOCALES.reduce((prevTranslation, locale) => {
    const args = {};
    const translation = translate.get(translationKey, locale, args);
    if (!prevTranslation) return translation;

    test(`must return translated content in "${LOCALES.toString()}" for translation key: "${translationKey}"`, t => {
      t.truthy(translation);
      t.truthy(prevTranslation);
      t.not(prevTranslation, translation);

      return translation;
    });
  }, '');
});

test('must return a validator error containing an translated message', t => {
  const field = 'email';
  const userDoc = { username: 'aaa' };
  const { validator, ...error } = isRequiredValidator(field)(userDoc);

  const translation1 = translate.error(error, LOCALE_PRIMARY, userDoc);
  const translation2 = translate.error(error, LOCALE_SECONDARY, userDoc);

  t.truthy(translation1.message);
  t.truthy(translation2.message);
  t.not(translation1.message, translation2.message);
  t.notDeepEqual(translation1, translation2);
});
