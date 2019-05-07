const { users } = require('../__fixtures__/_users');

exports.createUserResolver = (req, res) => {
  const user = req.body;
  if (user && !user.name) {
    return res.status(500)
      .json({ code: 'USER_IS_INVALID', message: 'User must contain "name".' });
  }

  user.id = (users.length + 1);
  users.push(user);

  return res.status(200).json(user);
};
