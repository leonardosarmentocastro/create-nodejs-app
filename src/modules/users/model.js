
const mongoose = require('mongoose');

// WARNING: Circular dependency prone:
// server startup > (bootstrap users module) "createUserResolver" requires "UsersModel" > requires "authentication barrel" > "connect" requires "createUserResolver"
const { authenticationSchema } = require('../authentication/schema');
const {
  isAlreadyInUseValidator,
  isRequiredValidator,
  isTooLongValidator,
  isValidEmailValidator,
  paginationPlugin,
  sharedSchema,
  sharedValidate,
} = require('../../shared');

const usersSchema = new mongoose.Schema({
  email: String,

  // Set of fields that must be stripped out when serving this model's data.
  privateFields: {
    password: String,
  },

  username: String,
});

// Middlewares
const USERS_USERNAME_MAX_LENGTH = 24;
const validationsMiddleware = async (userDoc, next) => {
  const constraints = [
    // ...['email', 'username', 'password'].map(field => isRequiredValidator(field)), // TODO: use  validator for "password" on authentication schemaschema
    ...['email', 'username'].map(field => isRequiredValidator(field)),
    ...['email', 'username'].map(field => isAlreadyInUseValidator(field)),
    isTooLongValidator('username', USERS_USERNAME_MAX_LENGTH),
    isValidEmailValidator,
  ];
  const error = await sharedValidate(constraints, userDoc);

  return next(error);
};

// Virtuals - https://mongoosejs.com/docs/api.html#document_Document-toObject
const transform = (doc, ret) => {
  const {
    __v,
    _id,
    privateFields,
    ...publicFields
  } = ret;

  return publicFields;
};

// Setup
usersSchema.add(sharedSchema);
usersSchema.add(authenticationSchema); // TODO: implement
usersSchema.plugin(paginationPlugin);
usersSchema.post('validate', validationsMiddleware);
usersSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});

const UsersModel = mongoose.model('User', usersSchema);

module.exports = {
  transform,
  usersSchema,
  UsersModel,
  USERS_USERNAME_MAX_LENGTH,
  validationsMiddleware,
};
