const mongoose = require('mongoose');

// Middlewares
// const preSaveMiddleware = function(next) {
//   const schema = this;
//   schema.updatedAt = schema.updatedAt ? dayjs().toISOString() : schema.createdAt;

//   next();
// }

// Schema definitions
const authenticationSchema = new mongoose.Schema({
  _id: false,
  password: String,
});
// authenticationSchema.pre('save', preSaveMiddleware);

console.log('### authenticationSchema', authenticationSchema);
module.exports = {
  // preSaveMiddleware,
  authenticationSchema
};
