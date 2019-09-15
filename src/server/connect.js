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
    // [RFC #MONOREPO-AUTHORIZATION]
    // TODO: when moving authorization to its own repo, we would aim to use it somehow as follows:
    // const allowedRoutes = [
    //   // { method: 'options' }, // NOTE: the `{ cors: true }` config purpose is to replace this line.
    //   { method: 'get', url: '/' },
    //   { method: 'get', url: '/health' },
    //   { method: 'post', url: '/authentication/sign-up' },
    //   { method: 'post', url: '/authentication/sign-in' },
    // ];
    // app.use(authorizationMiddleware(allowedRoutes, { cors: true }));

    // NOTE: but for now, every necessary information is served internally
    app.use(authorizationMiddleware);
  },
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
