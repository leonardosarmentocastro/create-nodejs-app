const { authenticationEncrypter } = require('../encrypter');
const { authenticationTranslatedError } = require('../errors');
const { sharedValidate, isRequiredValidator } = require('../../../shared');
const { isPasswordStrongValidator } = require('../validators');

// const validate = async (userPayload) => {
//   const err = await sharedValidate([
//     isRequiredValidator('password'),
//     isPasswordStrongValidator,
//   ], userPayload);

//   return err;
// };

// TODO: Unit / functional test
exports.signUpResolver = async (req, res, next) => {
  // const userPayload = req.body;
  // const err = await validate(userPayload);
  // if (err) return authenticationTranslatedError(req, res, { err, statusCode: 400 });

  // // TODO: surround code below with "try/catch" and respond with "unexpected error" on catch.
  // const phcstr = authenticationEncrypter.hash(userPayload.password);
  // userPayload.privateFields = { password: phcstr };

  next();
};
