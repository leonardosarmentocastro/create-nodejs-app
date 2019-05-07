require('dotenv').config(); // Load environment variables from ".env".
const database = require('./src/database');
const { server } = require('./src/server');

(async () => {
  try {
    await database.connect();
    const api = await server.start();
    // await server.close(api); // Example of how to close the API.
  } catch(err) {
    console.error(err);
  }
})();
