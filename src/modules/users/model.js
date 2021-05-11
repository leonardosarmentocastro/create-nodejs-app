const mongoose = require('mongoose');

// WARNING: Circular dependency prone: server startup > (bootstrap users module) "createUserResolver" requires "UsersModel" > requires "authentication barrel" > "connect" requires "createUserResolver"
const { authenticationSchema } = require('../authentication/schema'); // TODO: think it at higher level on how to avoid it with module exporting convention
const {
  isAlreadyInUseValidator,
  isRequiredValidator,
  isTooLongValidator,
  isValidEmailValidator,
  validate,
} = require('@leonardosarmentocastro/validate');

const { commonSchema } = require('@leonardosarmentocastro/database');
const { paginationPlugin } = require('@leonardosarmentocastro/pagination');

const usersSchema = new mongoose.Schema({
  email: String,
  username: String,
});

// Middlewares
const USERS_USERNAME_MAX_LENGTH = 24;
const validationsMiddleware = async (userDoc, next) => {
  const constraints = [
    ...['email', 'username'].map(field => isRequiredValidator(field)),
    ...['email', 'username'].map(field => isAlreadyInUseValidator(field)),
    isTooLongValidator('username', USERS_USERNAME_MAX_LENGTH),
    isValidEmailValidator,
  ];
  const error = await validate(constraints, userDoc);

  return next(error);
};

// Virtuals - https://mongoosejs.com/docs/api.html#document_Document-toObject
const transform = (doc, ret) => {
  const {
    __v, _id, // MongoDB default
    password, // From "authenticationSchema"
    ...fields
  } = ret;

  return fields;
};

// Setup
usersSchema.add(commonSchema);
usersSchema.add(authenticationSchema);
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
};
