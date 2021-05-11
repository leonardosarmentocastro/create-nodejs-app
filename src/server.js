const i18n = require('@leonardosarmentocastro/i18n');
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

  generateApiDocs() {
    if (process.env.NODE_ENV === 'test') require('the-owl').connect(app);
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
      middlewares: (app) => {
        $middlewares(app).connect();
      },
      routes: (app) => {
        $routes(app).connect();
      },
    });

    return api;
  },
};
