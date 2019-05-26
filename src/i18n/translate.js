const MessageFormat = require('messageformat');

const { $translations } = require('./translations');

class Translate {
  constructor() {
    const translations = $translations();

    const translationFiles = translations.load();
    const availableLanguages = translations.getAvailableLanguages();
    console.log('## availableLanguages', availableLanguages); // TODO: remove
    const mf = new MessageFormat(availableLanguages);

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
