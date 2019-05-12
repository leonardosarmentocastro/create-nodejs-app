const { server } = require('../../server');

exports.tearDownFunctionalTest = (t) => server.close(t.context.api);
