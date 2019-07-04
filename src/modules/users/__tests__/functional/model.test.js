const test = require('ava');

const database = require('../../../../database');
const { UsersModel } = require('../../model');
const { validPrefixedUserFixture } = require('../__fixtures__');

test.before(t => database.connect());
test.beforeEach(t => UsersModel.deleteMany({}))

const getUsersSavedOnDatabase = () => UsersModel.find({});
test('user creation must succeeds', async t => {
  t.assert((await getUsersSavedOnDatabase()).length === 0);

  await new UsersModel({
    email: 'email@domain.com',
    username: 'username-123',
  }).save();

  t.assert((await getUsersSavedOnDatabase()).length === 1);
});

//  pagination
// https://github.com/edwardhotchkiss/mongoose-paginate/blob/master/index.js

// // how to compute "count" prop
// // interface
// docs: []
// hasNextPage: Number
// hasPreviousPage: Number
// nextPage: Number // nullable
// previousPage: Number // nullable
// totalCount: !Number // https://mongoosejs.com/docs/api.html#model_Model.estimatedDocumentCount
// totalPages: !Number


// // params
// amountPerPage=5 // @param (or "limit")
// page=2 // @param (sempre >= 1)
// sort=[ "+", "-" ] // @param
// skip=(page - 1) * amountPerPage // @computed

// // javascript
// let docsQuery = this.find(query)
//   .select(select)
//   .sort(sort)
//   .skip(skip)
//   .limit(limit)
//   .lean(lean);

// TODO: move this test to pagination middleware, maybe?
test('must be able to fetch data paginated', async t => {
  const createUsers = (prefixes) => Promise.all(
    prefixes.map(number => {
      const user = validPrefixedUserFixture(number);
      return UsersModel.create(user);
    })
  );

  await createUsers([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);

  // username: '7_username123',
  // username: { $eq: '7_username123' },
  // $text: {
  //   $search: 'username',
  // },
  // a, c, p, s
  // c, l, p, s
  const conditions = { email: '@domain.com' }; // @param
  const limit = 3; // @param TODO: specify default value of 1
  const page = 1; // @param NOTE: important to reset page to 1 when querying with filters.
  const sort = { email: 'asc' }; // @param
  const skip = (page - 1) * limit; // @computed

  const totalCount = await UsersModel.find(conditions).countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = (page < totalPages);
  const hasPreviousPage = (page > 1);
  const nextPage = (hasNextPage ? page + 1 : null);
  const previousPage = (hasPreviousPage ? page - 1 : null);

  const query = UsersModel.find()
    .limit(limit)
    .skip(skip)
    .sort(sort);

  console.log('### query', await query);
  console.log('### count', await totalCount);
  console.log({
    docs: await query,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  });
  t.pass();
});

test.todo('index "$text" works for "email" and "username"');
