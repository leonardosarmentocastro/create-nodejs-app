const test = require('ava');

const { isRequired } = require('../../../modules/users/validators');
const { translate } = require('../../translate');

const LOCALE_PRIMARY = 'en-us';
const LOCALE_SECONDARY = 'pt-br';

test('must return translated content', t => {
  const args = {};
  const locales = [ LOCALE_PRIMARY, LOCALE_SECONDARY ];
  const keys = [
    'USERS_ERROR_EMAIL_ALREADY_IN_USE',
    'USERS_ERROR_EMAIL_INVALID',
    'USERS_ERROR_FIELD_IS_REQUIRED',
    'USERS_ERROR_USER_NOT_FOUND',
    'USERS_ERROR_USERNAME_ALREADY_IN_USE',
    'USERS_ERROR_USERNAME_TOO_LONG',
  ];

  keys.forEach(key =>
    locales.reduce((prevTranslation, locale) => {
      const translation = translate.get(locale, key, args);
      if (!prevTranslation) return translation;

      t.truthy(translation);
      t.truthy(prevTranslation);
      t.not(prevTranslation, translation);

      return translation;
    }, '')
  );
});

test('must return a validator error containing an translated message', t => {
  const field = 'email';
  const userDoc = { username: 'aaa' };
  const { validator, ...error } = isRequired(field)(userDoc);

  const translation1 = translate.error(error, LOCALE_PRIMARY, userDoc);
  const translation2 = translate.error(error, LOCALE_SECONDARY, userDoc);

  t.truthy(translation1.message);
  t.truthy(translation2.message);
  t.not(translation1.message, translation2.message);
  t.notDeepEqual(translation1, translation2);
});
