const mongoose = require('mongoose');

const { authenticationEncrypter } = require('./encrypter');
const { isPasswordStrongValidator } = require('./validators');
const { isRequiredValidator, sharedValidate } = require('../../shared');

// Schema definitions
const authenticationSchema = new mongoose.Schema({
  _id: false,
  password: { type: String },
});

// Middlewares
const preSaveMiddleware = async function() {
  const schema = this;

  const isPasswordHashed = authenticationEncrypter.isHashed(schema.password);
  if (!isPasswordHashed) schema.password = await authenticationEncrypter.hash(schema.password);
}

const validationsMiddleware = async (authorizationDoc, next) => {
  const constraints = [ isRequiredValidator('password'), isPasswordStrongValidator ];
  const error = await sharedValidate(constraints, authorizationDoc);

  return next(error);
};

// Setup
authenticationSchema.pre('save', preSaveMiddleware);
authenticationSchema.post('validate', validationsMiddleware);

module.exports = {
  preSaveMiddleware,
  authenticationSchema
};
