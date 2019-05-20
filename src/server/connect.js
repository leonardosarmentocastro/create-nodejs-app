const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const theOwl = require('the-owl');

const modules = require('../modules');
const i18n = require('../i18n');

const middlewares = (app) => ({
  connect() {
    // Executes all functions except "connect".
    Object.keys(this)
      .filter(method => method !== 'connect')
      .forEach(method => this[method]());
  },

  bodyParser() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  },
  cors() {
    app.use(cors());
  },
  i18n() {
    i18n.connect(app);
  },
  generateApiDocs() {
    if (process.env.NODE_ENV === 'test') theOwl.connect(app);
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

const routes = (app) => ({
  connect() {
    // CONVENTION: Each module exports its "connect" function.
    Object.values(modules)
      .forEach(_module => _module.connect(app));
  },
});

exports.connect = (app) => {
  middlewares(app).connect();
  routes(app).connect();
};
