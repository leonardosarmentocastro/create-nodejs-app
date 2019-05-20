const locale = require("locale")

const { AVAILABLE_LANGUAGES } = require('./available-languages');
const DEFAULT_LANGUAGE = process.env.LANGUAGE || 'en-us';

// Exposes "req.locale" which is the best match for user's "accept-language" header.
exports.connect = (app) => {
  app.use(
    locale(AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE)
  );
};
