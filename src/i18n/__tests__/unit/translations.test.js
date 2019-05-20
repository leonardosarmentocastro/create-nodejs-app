const test = require('ava');
const yaml = require('js-yaml');

const { $translations } = require('../../translations');

test('(getAvailableLanguages) must return an array with all file names under translation folder, stripping its ".yml" extension', t => {
  const translations = $translations();
  translations.getTranslationFileNames = () => [ 'es-ES.yml', 'fr-FR.yml' ];

  t.deepEqual(
    translations.getAvailableLanguages(), [ 'es-ES', 'fr-FR' ]
  );
});

test('(getTranslationFileNames) must return file names under translation folder', t => {
  const translationFileNames = [ 'de-DE.yml', 'it-IT.yml' ];
  const translations = $translations({ __readdirSync: () => translationFileNames });

  t.is(
    translations.getTranslationFileNames(), translationFileNames
  );
});

test('(load) must read all ".yml" files and map them as "language: content" js objects', async t => {
  const translationFileContent = `USERS:
  ERROR_EMAIL_ALREADY_IN_USE: The email "{email}" is already in use.`;
  const translations = $translations({
    __readFileSync: () => translationFileContent
  });
  translations.getTranslationFileNames = () => [ 'en-us.yml', 'pt-br.yml' ];

  const object = yaml.safeLoad(translationFileContent);
  const translationFiles = await translations.load();

  t.deepEqual(translationFiles, {
    'en-us': object,
    'pt-br': object,
  });
});
