const mongoose = require('mongoose');

exports.DEFAULTS = {
  model: mongoose.model('Model', new mongoose.Schema({ example: Boolean })),
};
