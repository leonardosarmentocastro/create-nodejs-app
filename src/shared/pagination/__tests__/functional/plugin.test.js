const test = require('ava');

// TODO
// 1. create a model for this test
// 2. attach the function as a static schema method
// 3. create test scenarios using valid data from "pagination middleware"
// 4. assert exposed payload interface
test('', t => {

});

// REFERENCE (previously on "modules/users/__tests__/unit/model.test.js")
// https://github.com/edwardhotchkiss/mongoose-paginate/blob/master/index.js

// const { validPrefixedUserFixture } = require('../__fixtures__');
// test('must be able to fetch data paginated', async t => {
//   const createUsers = (prefixes) => Promise.all(
//     prefixes.map(number => {
//       const user = validPrefixedUserFixture(number);
//       return UsersModel.create(user);
//     })
//   );

//   await createUsers([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);

//   const conditions = { email: '@domain.com' }; // @param
//   const limit = 3; // @param TODO: specify default value of 1
//   const page = 1; // @param NOTE: important to reset page to 1 when querying with filters.
//   const sort = { email: 'asc' }; // @param
//   const skip = (page - 1) * limit; // @computed

//   const totalCount = await UsersModel.find(conditions).countDocuments();
//   const totalPages = Math.ceil(totalCount / limit);
//   const hasNextPage = (page < totalPages);
//   const hasPreviousPage = (page > 1);
//   const nextPage = (hasNextPage ? page + 1 : null);
//   const previousPage = (hasPreviousPage ? page - 1 : null);

//   const query = UsersModel.find()
//     .limit(limit)
//     .skip(skip)
//     .sort(sort);

//   // console.log('### query', await query);
//   // console.log('### count', await totalCount);
//   console.log({
//     docs: await query,
//     totalCount,
//     totalPages,
//     hasNextPage,
//     hasPreviousPage,
//     nextPage,
//     previousPage,
//   });
//   t.pass();
// });

