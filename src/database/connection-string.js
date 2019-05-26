

exports.CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING || `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE_NAME}`;
