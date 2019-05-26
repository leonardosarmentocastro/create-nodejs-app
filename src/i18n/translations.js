const fs = require('fs');
const yaml = require('js-yaml');

const DEFAULT = {
  __readdirSync: fs.readdirSync,
  __readFileSync: fs.readFileSync
};
const TRANSLATIONS_PATH = `${process.cwd()}/translations`;
const options = { encoding: 'utf8' };

exports.$translations = ({
  __readdirSync,
  __readFileSync,
} = DEFAULT) => ({
  getAvailableLanguages() {
    return this.getTranslationFileNames()
      .reduce((availableLanguages, translationFileName) => {
        const substrings = translationFileName.split('.yml');
        const isYmlFile = (substrings.length >= 2);
        if (isYmlFile) {
          const [ language ] = substrings;
          return availableLanguages.concat(language);
        }

        return availableLanguages;
      }, []);
  },

  getTranslationFileNames() {
    return __readdirSync(TRANSLATIONS_PATH, options);
  },

  load() {
    return this.getTranslationFileNames()
      .reduce((translationFiles, translationFileName) => {
        const [ language ] = translationFileName.split('.yml'); // "en-us"
        const textContent = __readFileSync(`${TRANSLATIONS_PATH}/${translationFileName}`, options);

        return {
          ...translationFiles,
          [language]: yaml.safeLoad(textContent),
        };
      }, {})
  },
});
