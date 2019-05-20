const { getTranslationFilesName } = require('./get-translation-files-names');

exports.AVAILABLE_LANGUAGES = getTranslationFilesName()
  .reduce((availableLanguages, translationFileName) => {
    const [ language ] = translationFileName.split('.yml');
    return availableLanguages.concat(language);
  }, []);
