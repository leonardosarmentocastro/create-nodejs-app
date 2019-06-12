const { userTranslatedValidationError } = require('../errors');
const { translate } = require('../../../i18n');
const { UsersModel } = require('../model');

exports.createUserResolver = async (req, res) => {
  const userDoc = new UsersModel(req.body);

  try {
    const savedUser = await userDoc.save();
    const transformedUser = savedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    return userTranslatedValidationError(req, res, { err, userDoc });
  }
};
