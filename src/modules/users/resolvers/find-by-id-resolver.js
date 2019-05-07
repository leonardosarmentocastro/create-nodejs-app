const { users } = require('../__fixtures__/_users');

exports.findByIdResolver = (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);

  const hasUser = !!user;
  if (!hasUser) {
    return res.status(500)
      .json({ code: 'USER_NOT_FOUND', message: `User "${userId}" not found!` });
  }

  return res.status(200).json(user);
};
