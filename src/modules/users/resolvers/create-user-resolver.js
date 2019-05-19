const { UsersModel } = require('../model');

exports.createUserResolver = async (req, res) => {
  try {
    const userDoc = new UsersModel(req.body);
    const savedUser = await userDoc.save();

    return res.status(200).json(savedUser.toObject());
  } catch(error) {
    return res.status(500).json(error);
  }
};
