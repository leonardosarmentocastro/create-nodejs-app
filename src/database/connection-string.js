

exports.CONNECTION_STRING =
  `mysql://${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE_NAME}`;
