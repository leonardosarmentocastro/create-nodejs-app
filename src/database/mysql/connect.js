const knex = require('knex');

const { connectToDatabase } = require('../connect-to-database');
const { CONNECTION_STRING } = require('./connection-string');

exports.connect = () =>
  connectToDatabase(() => knex({
    client: 'mysql',
    connection: {
      database: process.env.MYSQL_DATABASE_NAME,
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
    },
  }), {
    name: 'mysql',
    CONNECTION_STRING,
  });
