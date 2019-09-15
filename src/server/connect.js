const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const i18n = require('../i18n');
const modules = require('../modules');
const { authorizationMiddleware } = require('../shared');

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
  bodyParser() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  },
  cors() {
    app.use(cors());
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
  prettifyJsonOutput() {
    app.set('json spaces', 2);
  }
});

const $routes = (app) => ({
  connect() {
    // CONVENTION: Each module exports its "connect" function.
    Object.values(modules)
      .forEach(_module => _module.connect(app));
  },
});

exports.connect = (app) => {
  $middlewares(app).connect();
  $routes(app).connect();
};
