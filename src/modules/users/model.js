const mongoose = require('mongoose');
const { authenticationSchema } = require('@leonardosarmentocastro/authentication'); // TODO: think it at higher level on how to avoid it with module exporting convention
const { commonSchema, plugSchema, transform } = require('@leonardosarmentocastro/database');
const { paginationPlugin } = require('@leonardosarmentocastro/pagination');
const {
  isAlreadyInUseValidator,
  isRequiredValidator,
  isTooLongValidator,
  isValidEmailValidator,
  validate,
} = require('@leonardosarmentocastro/validate');

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

// Setup
usersSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});
usersSchema.plugin(plugSchema(commonSchema));
usersSchema.plugin(plugSchema(authenticationSchema));
usersSchema.plugin(paginationPlugin);
usersSchema.post('validate', validationsMiddleware);


const UsersModel = mongoose.model('User', usersSchema);

module.exports = {
  usersSchema,
  UsersModel,
  USERS_USERNAME_MAX_LENGTH,
};
