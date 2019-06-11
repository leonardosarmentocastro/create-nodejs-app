const { isMongoId } = require('validator');

const { USERS_ERROR_USER_NOT_FOUND } = require('../errors');
const { UsersModel } = require('../model');

const userNotFoundError = (req) => {
  const err = USERS_ERROR_USER_NOT_FOUND;
  const args = { userId: req.params.id };

  return translate.error(err, req.locale, args);
}

// TODO: unfinished. Validations for update operations doesnt seem to work properly.
// Maybe find + lodash extend + save would be a good option.
exports.updateUserResolver = async (req, res) => {
  const userId = req.params.id;
  if (!isMongoId(userId)) return res.status(500).json(userNotFoundError(req));

  try {
    // const userDoc = new UsersModel(req.body);
    // await userDoc.validate();

    const userPayload = req.body;
    const updatedUser = await UsersModel.findOneAndUpdate({ _id: userId }, userPayload);
    if (!updatedUser) return res.status(500).json(userNotFoundError(req));

    const transformedUser = updatedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    return res.status(500).json(err);
  }
};
