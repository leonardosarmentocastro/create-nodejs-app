const { isMongoId } = require('validator');

const { userNotFoundError, userTranslatedValidationError } = require('../errors');
const { translate } = require('../../../i18n');
const { UsersModel } = require('../model');

exports.updateUserResolver = async (req, res) => {
  const userId = req.params.id;
  if (!isMongoId(userId)) return userNotFoundError(req, res);

  let userDoc = await UsersModel.findById(userId);
  if (!userDoc) return userNotFoundError(req, res);

  const userPayload = req.body;
  const userToUpdate = Object.assign(userDoc, userPayload);

  try {
    const updatedUser = await userToUpdate.save();
    const transformedUser = updatedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    return userTranslatedValidationError(req, res, { err, userDoc });
  }
};
