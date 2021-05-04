const express = require('express'); // TODO: REMOVE (https://stackoverflow.com/a/24344756)
const errorhandler = require('errorhandler');
const i18n = require('@leonardosarmentocastro/i18n');
const morgan = require('morgan');
const server = require('@leonardosarmentocastro/server');

const modules = require('./modules');
const { authorizationMiddleware } = require('./shared');

const $middlewares = (app) => ({
  connect() {
    // Executes all functions except "connect".
    Object.keys(this)
      .filter(method => method !== 'connect')
      .forEach(method => this[method]());
  },

  i18n() {
    // NOTE: must come first to fill "req.locale" for all subsequent middlewares.
    i18n.connect(app);
  },
  authorization() {
    const allowedRoutes = [
      { method: 'get', url: '/users/me' },
    ];
    const options = { allowCORS: true, allowAuthentication: true };
    app.use(authorizationMiddleware(allowedRoutes, options));
  },
  // TODO: plug it in
  // authentication() {
  //   const { authenticationMiddleware } = modules.authentication;
  //   app.use(authenticationMiddleware);
  // },

  // TODO: REMOVE (https://stackoverflow.com/a/24344756)
  bodyParser() {
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true
    }));
  },

  generateApiDocs() {
    if (process.env.NODE_ENV === 'test') require('the-owl').connect(app);
  },
  prettifyStacktraceOnBrowser() {
    app.use(errorhandler());
  },
  logRequestsOnConsole() {
    const logFormat = 'dev';
    app.use(morgan(logFormat));
  },
});

const $routes = (app) => ({
  connect() {
    // CONVENTION: Each module exports its "connect" function.
    Object.values(modules)
      .forEach(_module => _module.connect(app));
  },
});

exports.server = {
  ...server,
  async start(port) {
    const api = await server.start(port, {
      connect: (app) => {
        $middlewares(app).connect();
        $routes(app).connect();
      },
    });

    return api;
  },
};
