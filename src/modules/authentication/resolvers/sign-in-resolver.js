const { authenticationEncrypter } = require('../encrypter');
const {
  authenticationTranslatedError,
  AUTHENTICATION_ERROR_USER_EMAIL_NOT_FOUND,
  AUTHENTICATION_ERROR_USER_PASSWORD_MISMATCH,
} = require('../errors');
const { UsersModel } = require('../../users');
const { isRequiredValidator, validate } = require('@leonardosarmentocastro/validate');

exports.signInResolver = async (req, res, next) => {
  try {
    const constraints = [ ...[ 'email', 'password' ].map(field => isRequiredValidator(field)) ];
    const err = await validate(constraints, req.body);
    if (err) throw { err, statusCode: 400 };

    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });
    if (!user) throw { err: AUTHENTICATION_ERROR_USER_EMAIL_NOT_FOUND, statusCode: 404 };

    const hasMatched = await authenticationEncrypter.verify(user.password, password);
    if (!hasMatched) throw { err: AUTHENTICATION_ERROR_USER_PASSWORD_MISMATCH, statusCode: 404 };

    const transformedUser = user.toObject();
    req.signedInUser = transformedUser;
    next();
  } catch ({ err, statusCode }) {
    return authenticationTranslatedError(req, res, { err, statusCode });
  }
};
