const { UsersModel } = require('../model');
const { userNotFoundError } = require('../errors');

exports.findByIdResolver = async (req, res) => {
  const userId = req.params.id;
  const dbUser = await UsersModel.findById(userId);
  if (!dbUser) return res.status(500).json(userNotFoundError(userId));

  return res.status(200).json(dbUser.toObject());
};
