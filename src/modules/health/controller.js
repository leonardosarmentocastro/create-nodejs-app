const healthController = {
  get: (req, res) =>
    res.status(200).json({
      application: 'up',
    })
};

module.exports = healthController;
