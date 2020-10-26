module.exports = {
  mongodb: { ...require('./mongodb/connect') },
  mysql: { ...require('./mysql/connect') },
};
