const paginationPlugin = function (pagination) {
  const model = this; // function context reffers to mongoose model instance.
  const { conditions, limit, page, sort } = pagination;

  // computed values
  const totalCount = await model.find(conditions).countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  const hasNextPage = (page < totalPages);
  const hasPreviousPage = (page > 1);
  const nextPage = (hasNextPage ? page + 1 : null);
  const previousPage = (hasPreviousPage ? page - 1 : null);

  const skip = (page - 1) * limit;
  const query = model.find()
    .limit(limit)
    .skip(skip)
    .sort(sort);

  return {
    docs: await query,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    totalCount,
    totalPages,
  };
};
