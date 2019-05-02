const healthController = require('./controller');

const healthRouter = {
  connect(app) {
    app.get('/health', healthController.get);
  }
};

module.exports = healthRouter;
