const { UsersModel } = require('../model');
const { sharedUnexpectedError } = require('../../../shared');

exports.findUsersResolver = async (req, res) => {
  try {
    const users = await UsersModel.paginate(req.pagination);
    return res.status(200).json(users);
  } catch(err) {
    return sharedUnexpectedError(req, res, { err });
  }
};
