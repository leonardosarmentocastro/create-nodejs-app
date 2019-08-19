
const mongoose = require('mongoose');

const { paginationPlugin, sharedSchema } = require('../../shared');
const {
  isAlreadyInUseValidator,
  isValidEmailValidator,
  isRequiredValidator,
  isTooLongValidator,
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
  // TODO: Add validation for "privateFields.password" (?)
  // - This will maybe affect other tests...
  //  - [+] But will ensure that all user creation pass through the same validation constraints
  //  - [?] But what about "createUsersResolver" which is expecting "privateFields.password" to come from another resolver request's mutation?
  const constraints = [
    isRequiredValidator('email'),
    isRequiredValidator('username'),
    isValidEmailValidator,
    isAlreadyInUseValidator('email'),
    isTooLongValidator('username', USERS_USERNAME_MAX_LENGTH),
    isAlreadyInUseValidator('username'),
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
