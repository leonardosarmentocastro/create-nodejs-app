const test = require('ava');

const { authenticationEncrypter } = require('../../encrypter');

// Fixtures
const PASSWORDS = ['123456', 'p@ssw0rd', '+123abc321+'];

test('must be able to encrypt a string and validate against the corresponding uncrypted string', async t => {
  for (const password in PASSWORDS) {
    const hashedPassword = await authenticationEncrypter.hash(password);

    t.assert(hashedPassword !== password);
    t.truthy(await authenticationEncrypter.verify(hashedPassword, password));
  }
});

test('every new encryption must generate a different hashed output, while still matching the uncrypted value', async t => {
  for (const password in PASSWORDS) {
    const hashedPassword1 = await authenticationEncrypter.hash(password);
    const hashedPassword2 = await authenticationEncrypter.hash(password);

    t.assert(hashedPassword1 !== hashedPassword2);
    t.truthy(await authenticationEncrypter.verify(hashedPassword1, password));
    t.truthy(await authenticationEncrypter.verify(hashedPassword2, password));
  }
});

test('must be able to tell if a string is encrypted or not', async t => {
  for (const password in PASSWORDS) {
    const hashedPassword = await authenticationEncrypter.hash(password);

    t.truthy(authenticationEncrypter.isHashed(hashedPassword));
    t.falsy(authenticationEncrypter.isHashed(password));
  }
});
