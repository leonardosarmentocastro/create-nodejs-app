const { isMongoId } = require('validator');

const { UsersModel } = require('../model');
const { USERS_ERROR_USER_NOT_FOUND } = require('../errors');
const { translate } = require('../../../i18n');

const error = (req) => {
  const err = USERS_ERROR_USER_NOT_FOUND;
  const args = { userId: req.params.id };

  return translate.error(err, req.locale, args);
}

exports.findByIdResolver = async (req, res) => {
  const userId = req.params.id;
  if (!isMongoId(userId)) return res.status(500).json(error(req));

  const dbUser = await UsersModel.findById(userId);
  if (!dbUser) return res.status(500).json(error(req));

  return res.status(200).json(dbUser.toObject());
};
