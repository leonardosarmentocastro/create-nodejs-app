const { UsersModel } = require('../model');
const { translate } = require('../../../i18n');

exports.createUserResolver = async (req, res) => {
  const userDoc = new UsersModel(req.body);

  try {
    const savedUser = await userDoc.save();
    const transformedUser = savedUser.toObject();

    return res.status(200).json(transformedUser);
  } catch(err) {
    const args = userDoc.toObject();
    const error = translate.error(err, req.locale, args);

    return res.status(500).json(error);
  }
};
