const test = require('ava');
const yaml = require('js-yaml');

const { loadTranslationFiles } = require('../../load-translation-files');

const TRANSLATION_FILE_NAME_1 = 'en-us.yml';
const TRANSLATION_FILE_NAME_2 = 'pt-br.yml';
const [ language1 ] = TRANSLATION_FILE_NAME_1.split('.yml');
const [ language2 ] = TRANSLATION_FILE_NAME_2.split('.yml');
const translationFilesName = [ TRANSLATION_FILE_NAME_1, TRANSLATION_FILE_NAME_2 ];
const textContent = `USERS:
  ERROR_EMAIL_ALREADY_IN_USE: The email "{email}" is already in use.
`;
test('must read all ".yml" files and map them as "language: content" js objects', async t => {
  const readFileSync = () => textContent;
  const jsContent = yaml.safeLoad(textContent);
  const translationFiles = await loadTranslationFiles({ readFileSync, translationFilesName });

  t.deepEqual(translationFiles, {
    [language1]: jsContent,
    [language2]: jsContent,
  });
});
