exports.getHealthResolver = (req, res) =>
  res.status(200).json({
    application: 'up',
  });
