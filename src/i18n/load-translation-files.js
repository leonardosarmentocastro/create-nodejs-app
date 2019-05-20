const fs = require('fs');
const mem = require('mem');
const yaml = require('js-yaml');

const { getTranslationFilesName } = require('./get-translation-files-names');
const { TRANSLATIONS_PATH } = require('./translations-path');

const DEFAULT = {
  translationFilesName: getTranslationFilesName(),
  readFileSync: fs.readFileSync,
};
const options = { encoding: 'utf8' };
const loadTranslationFiles = ({ readFileSync, translationFilesName } = DEFAULT) =>
  translationFilesName
    .reduce((translationFiles, translationFileName) => {
      const [ language ] = translationFileName.split('.yml'); // "en-us"
      const textContent = readFileSync(`${TRANSLATIONS_PATH}/${translationFileName}`, options);
      const jsContent = yaml.safeLoad(textContent);

      return {
        ...translationFiles,
        [language]: jsContent,
      };
    }, {});

exports.loadTranslationFiles = mem(loadTranslationFiles);
