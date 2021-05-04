require('dotenv').config(); // Load environment variables from ".env".
const database = require('@leonardosarmentocastro/database');
const { server } = require('./src/server');

(async () => {
  try {
    await database.connect();
    await server.start();
  } catch(err) {
    console.error(err);
  }
})();
