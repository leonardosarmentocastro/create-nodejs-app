// TODO: implement
exports.findUsersResolver = (req, res) => {
  let { c: conditions, l: limit, p: page, s: sort } = req.query;
  return res.status(200).end();
};
