const { isMongoId } = require('validator');

const { userNotFoundError } = require('../errors');
const { UsersModel } = require('../model');
const { sharedUnexpectedError } = require('../../../shared');

exports.findUserByIdResolver = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isMongoId(userId)) return userNotFoundError(req, res);

    const dbUser = await UsersModel.findById(userId);
    if (!dbUser) return userNotFoundError(req, res);

    const transformedUser = dbUser.toObject();
    return res.status(200).json(transformedUser);
  } catch(err) {
    return sharedUnexpectedError(req, res, { err });
  }
};
