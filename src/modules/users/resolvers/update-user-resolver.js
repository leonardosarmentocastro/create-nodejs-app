const { isMongoId } = require('validator');

const { userNotFoundError, userTranslatedValidationError } = require('../errors');
const { UsersModel } = require('../model');
const { sanitizer } = require('@leonardosarmentocastro/database');

exports.updateUserResolver = async (req, res) => {
  const userId = req.params.id;
  if (!isMongoId(userId)) return userNotFoundError(req, res);

  const userDoc = await UsersModel.findById(userId);
  if (!userDoc) return userNotFoundError(req, res);

  const userPayload = sanitizer(req.body);
  const userToUpdate = Object.assign(userDoc, userPayload);

  try {
    const updatedUser = await userToUpdate.save();
    const transformedUser = updatedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    return userTranslatedValidationError(req, res, { err, userDoc });
  }
};
