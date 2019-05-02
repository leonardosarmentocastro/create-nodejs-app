const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const theOwl = require('the-owl');
const modules = require('../modules');

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
  generateApiDocs() {
    // TODO: only attach if its "test" environment.
    theOwl.connect(app);
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
    // CONVENTION: Each module *must* default export its router's "connect" function.
    Object.keys(modules)
      .forEach(router => modules[router].connect(app));
  },
});

const connect = (app) => {
  middlewares(app).connect();
  routes(app).connect();
};

module.exports = connect;
