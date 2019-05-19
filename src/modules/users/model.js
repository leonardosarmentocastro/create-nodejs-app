
const mongoose = require('mongoose');

const { sharedSchema } = require('../shared');
const {
  isEmailAlreadyInUse,
  isEmailValid,
  isRequired,
  isUsernameAlreadyInUse,
  isUsernameTooLong,
  validate,
} = require('./validators');

const usersSchema = new mongoose.Schema({
  email: String,

  // Set of fields that must be stripped out when serving this model's data.
  privateFields: {
    password: String,
  },

  username: String,
});

// Middlewares
const postValidateMiddleware = async (userDoc, next) => {
  const constraints = [
    isRequired('email'),
    isRequired('username'),
    isEmailValid,
    isEmailAlreadyInUse,
    isUsernameTooLong,
    isUsernameAlreadyInUse,
  ];
  const error = await validate(constraints, userDoc);

  return next(error);
};

// Virtuals
// https://mongoosejs.com/docs/api.html#document_Document-toObject
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
usersSchema.post('validate', postValidateMiddleware);
usersSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});

const UsersModel = mongoose.model('User', usersSchema);

module.exports = {
  postValidateMiddleware,
  transform,
  usersSchema,
  UsersModel
};
