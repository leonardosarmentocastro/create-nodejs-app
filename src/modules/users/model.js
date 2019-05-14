
const mongoose = require('mongoose');

const { sharedSchema } = require('../shared');

const usersSchema = new mongoose.Schema({
  email: String,

  // Set of fields that must be stripped out when serving this model's data.
  privateFields: {
    password: String,
  },

  username: String,
});
usersSchema.add(sharedSchema); // Inherit schema properties.

const usersModel = mongoose.model('User', usersSchema);

module.exports = { usersSchema, usersModel };
