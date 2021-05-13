# authentication

authentication using express mongoose

const { authenticationSchema } = require('./schema');

const schema = new mongoose.Schema({});
schema.add(authenticationSchema);
const model = new mongoose.model('Authentication', schema);