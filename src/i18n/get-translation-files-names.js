const fs = require('fs');
const mem = require('mem');

const { TRANSLATIONS_PATH } = require('./translations-path');
const options = { encoding: 'utf8' };

exports.getTranslationFilesName = mem(
  () => fs.readdirSync(TRANSLATIONS_PATH, options)
);
