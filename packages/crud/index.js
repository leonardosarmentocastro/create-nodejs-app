
process.env.LOCALE = 'en-us.yml';
const mongoose = require('mongoose');
const server = require('@leonardosarmentocastro/server');
const i18n = require('@leonardosarmentocastro/i18n');
const { database } = require('@leonardosarmentocastro/database');

const { crud } = require('./src/crud');

(async () => {
  await database.connect();
  await server.start(8080, {
    middlewares: (app) => {
      i18n.connect(app);
    },
    routes: (app) => {
      app.get('/translated', (req, res) => {
        const key = 'TRANSLATED_HELLO';
        const args = { name: 'Leonardo' };
        const translation = i18n.translate.get(key, req.locale, args);

        return res.status(200).send(translation);
      });

      crud.connect(app, mongoose.model('User', new mongoose.Schema({ user: String })));
    },
  });
})();
