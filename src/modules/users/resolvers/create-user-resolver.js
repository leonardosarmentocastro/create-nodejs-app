const { userTranslatedValidationError } = require('../errors');
const { UsersModel } = require('../model');

exports.createUserResolver = async (req, res) => {
  // TODO: use "sharedSanitizer" / add tests
  const userDoc = new UsersModel(req.body);

  try {
    const savedUser = await userDoc.save();
    const transformedUser = savedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    // TODO: add a middleware that catches unknown errors (sharedUnexpectedError).
    return userTranslatedValidationError(req, res, { err, userDoc });
  }
};
