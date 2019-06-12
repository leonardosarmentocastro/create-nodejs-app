const test = require('ava');

const { SHARED_ERROR_UNEXPECTED, sharedUnexpectedError } = require('../../errors');
const { translate } = require('../../../i18n');

test('[sharedUnexpectedError] must return a translated error message including stacktrace', t => {
  // Prepare
  const req = { locale: 'en-us' }; // Simulates the "locale" middleware.
  const res = { // Simulates express response object.
    status: function() { return this; },
    json: (payload) => payload,
  };

  try {
    // Execute
    throw new Error('simulating unexpected error thrown');
  } catch(err) {
    // Assert
    t.deepEqual(sharedUnexpectedError(req, res, { err }), {
      ...translate.error(SHARED_ERROR_UNEXPECTED, req.locale, {}),
      stacktrace: err.stack,
    });
  }
});
