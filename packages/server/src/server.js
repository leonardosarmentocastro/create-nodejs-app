const express = require('express');
const { connect } = require('./connect');

const DEFAULT = {
  connect: (app = express()) => {}, // Connect your custom middlewares (app.use()) and routes (app.get('/')).
};

exports.server = {
  close(api) {
    return new Promise((resolve) => {
      if (!api.listening) return resolve();

      api.close(() => {
        const successMessage = '[ server::CLOSED ] Server closed successfully!';
        console.info(successMessage);

        resolve();
      });
    });
  },

  listen(app, port) {
    const environment = process.env.NODE_ENV;
    const options = { environment, port };

    return new Promise((resolve, reject) => {
      app.listen(options, function() {
        const successMessage = `[ server::STARTED ] Server listening on port ${port} in ${environment} mode.`;
        console.info(successMessage);

        const api = this; // The context of the anonymous callback function is the node server instance.
        return resolve(api);
      }).on('error', (err) => {
        const errorMessage = [
          `[ server::ERROR ] Failed to start server on port ${port} in ${environment} mode.`
          `[ server::STACKTRACE ] ${err}`
        ].join('\r\n');

        return reject(errorMessage);
      });
    });
  },

  async start(port = process.env.PORT, options = DEFAULT) {
    const app = express();
    connect(app);
    options.connect(app);

    const api = await this.listen(app, port);
    return api;
  },
};
