
const mongoose = require('mongoose');

const { sharedSchema } = require('../../shared');
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

// TODO: Test this inside users model test.
// Full text search fields.
usersSchema.index({
  email: 'text',
  username: 'text',
});

// Middlewares
const USERS_USERNAME_MAX_LENGTH = 24;
const validationsMiddleware = async (userDoc, next) => {
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
