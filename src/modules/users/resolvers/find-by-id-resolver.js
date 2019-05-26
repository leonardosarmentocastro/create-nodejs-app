const { isMongoId } = require('validator');

const { UsersModel } = require('../model');
const { userNotFoundError } = require('../errors');
const { translate } = require('../../../i18n');

const error = (req) => {
  const userId = req.params.id;

  const err = userNotFoundError();
  const args = { userId };
  const error = translate.error(err, req.locale, args);

  return error;
}

exports.findByIdResolver = async (req, res) => {
  const userId = req.params.id;
  if (!isMongoId(userId)) return res.status(500).json(error(req));

  const dbUser = await UsersModel.findById(userId);
  if (!dbUser) return res.status(500).json(error(req));

  return res.status(200).json(dbUser.toObject());
};
