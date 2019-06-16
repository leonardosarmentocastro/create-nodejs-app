const dayjs = require('dayjs');
const mongoose = require('mongoose');

// Middlewares
const preSaveMiddleware = function(next) {
  const schema = this;
  schema.updatedAt = schema.updatedAt ? dayjs().toISOString() : schema.createdAt;

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

// Utils
const SHARED_SCHEMA_NOT_SETTABLE_FIELDS = [ 'id', '_id', 'createdAt', 'updatedAt' ];
const sharedSanitizer = (schema, fieldsToRemove = SHARED_SCHEMA_NOT_SETTABLE_FIELDS) =>
  Object.keys(schema)
    .filter(key => !fieldsToRemove.includes(key))
    .reduce((accumulator, key) => ({ ...accumulator, [key]: schema[key] }), {});

module.exports = {
  preSaveMiddleware,
  sharedSanitizer,
  SHARED_SCHEMA_NOT_SETTABLE_FIELDS,
  sharedSchema
};
