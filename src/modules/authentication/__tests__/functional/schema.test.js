const test = require('ava');
const mongoose = require('mongoose');

const database = require('../../../../database');
const { authenticationSchema } = require('../../schema');
const { isPasswordStrongValidator } = require('../../validators');
const { isRequiredValidator } = require('../../../../shared');

// Setup
test.before('connect to database', t => database.connect());
test.before('create sample "AuthenticationModel" model to work with on tests', t => {
  t.context.AuthenticationModel = mongoose.model('Authorization', authenticationSchema);
});

test('(validationsMiddleware) must throw an error if "password" is missing', async t => {
  const authenticationDoc = { password: '' };
  const { validator, ...err } = isRequiredValidator('password')(authenticationDoc);

  await new t.context.AuthenticationModel(authenticationDoc).save()
    .catch(error => t.deepEqual(error, err));
});

test('(validationsMiddleware) must throw an error if "password" is not strong enough', async t => {
  const authenticationDoc = { password: '123456' };
  const { validator, ...err } = isPasswordStrongValidator(authenticationDoc);

  await new t.context.AuthenticationModel(authenticationDoc).save()
    .catch(error => t.deepEqual(error, err));
});
