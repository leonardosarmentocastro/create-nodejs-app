const test = require('ava');

const { AVAILABLE_LANGUAGES } = require('../../available-languages');

test('must be all the translation files names without its ".yml" extension', t => {
  t.snapshot(AVAILABLE_LANGUAGES);
});
