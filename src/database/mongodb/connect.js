const mongoose = require('mongoose');

const { connectToDatabase } = require('../connect-to-database');
const { CONNECTION_STRING } = require('./connection-string');

exports.connect = () =>
  connectToDatabase(() =>
    mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }), {
      name: 'mongodb',
      CONNECTION_STRING,
    });
