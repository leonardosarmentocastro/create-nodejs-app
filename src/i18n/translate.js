const MessageFormat = require('messageformat');

const { loadTranslationFiles } = require('./load-translation-files');
const { AVAILABLE_LANGUAGES } = require('./available-languages');

class Translate {
  constructor() {
    const translationFiles = loadTranslationFiles();
    const mf = new MessageFormat(AVAILABLE_LANGUAGES);
    this.translate = mf.compile(translationFiles);
  }

  error(err, locale, args) {
    const errorArgs = { ...err, ...args };
    return {
      ...err,
      message: this.translate[locale][err.code](errorArgs),
    };
  }

  get(locale, key, args) {
    return this.translate[locale][key](args);
  };
}

// Exposes a singleton to avoid loading/compiling translation everytime they are required.
exports.translate = new Translate();
