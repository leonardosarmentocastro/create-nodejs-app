module.exports = {
  ...require('./available-languages'),
  ...require('./connect'),
  ...require('./get-translation-files-names'),
  ...require('./load-translation-files'),
  ...require('./translate'),
  ...require('./translations-path'),
};
