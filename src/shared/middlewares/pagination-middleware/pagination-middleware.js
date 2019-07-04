const { isNumeric, isJSON } = require('validator');

// const SORT = {
//   '+': 'asc',
//   '-': 'desc',
// };

const DEFAULT = {
  c: {}, // onditions
  l: 10, // imit
  p: 1, // age
  s: 'asc', // ort
};

const useDefaultValuesWhenNecessary = (queryParameters) =>
  Object.entries(DEFAULT)
    .reduce((accumulator, [ key, defaultValue ]) => {
      const queryParameter = queryParameters[key];
      const value = queryParameter || defaultValue;

      return { ...accumulator, [key]: value };
    }, {});

// TODO: implement
// TODO 2: maybe rename the folder "shared/middlewares" to "shared/pagination" and
// store all necessary files to pagination in there(middleware, the plugin function...).
const paginationMiddleware = (req, res, next) => {
  const queryParameters = useDefaultValuesWhenNecessary(req.query)

  // TODO: test
  let { c: conditions, l: limit, p: page, s: sort } = queryParameters;
  if (!isJSON(conditions)) throw new Error('conditions invalid'); // TODO: i18n
  if (!isNumeric(limit)) throw new Error('limit invalid'); // TODO: i18n
  if (!isNumeric(page)) throw new Error('limit invalid'); // TODO: i18n
  if (typeof sort !== 'string') throw new Error('sort invalid'); // TODO: i18n

  // TODO: test
  req.pagination = { conditions, limit, page, sort };

  next();
}

module.exports = {
  DEFAULT,
  useDefaultValuesWhenNecessary,
  paginationMiddleware,
};
