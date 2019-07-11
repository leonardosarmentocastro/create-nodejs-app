// TODO: implement
exports.findUsersResolver = (req, res) => {
  let { c: conditions, l: limit, p: page, s: sort } = req.query;
  console.log('# conditions', conditions);
  console.log('# limit', limit);
  console.log('# page', page);
  console.log('# sort', sort);

  return res.status(200).end();
};
