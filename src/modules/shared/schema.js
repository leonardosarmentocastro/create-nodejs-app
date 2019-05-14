const dayjs = require('dayjs');
const mongoose = require('mongoose');

// Middlewares
const preSaveMiddleware = function(next) {
  const schema = this;
  schema.updatedAt = dayjs().toISOString();

  next();
}

// Schema definitions
const sharedSchema = new mongoose.Schema({
  _id: false,
  createdAt: {
    type: String,
    default: dayjs().toISOString(),
    required: true,
  },
  updatedAt: {
    type: String,
    default: '',
  },
});
sharedSchema.pre('save', preSaveMiddleware);

module.exports = { preSaveMiddleware, sharedSchema };
