const { DEFAULTS } = require('./defaults');
const { createResolver } = require('./resolvers');

const deleteResolver = (req, res) => res.status(200).json({ deleted: true });
const findResolver = (model = DEFAULTS.model) => async (req, res) => {
  const found = await model.find();
  return res.status(200).json(found);
};
const findByIdResolver = (req, res) => res.status(200).json({ read: true });
const updateResolver = (req, res) => res.status(200).json({ updated: true });

exports.crud = {
  connect(app, model = DEFAULTS.model) {
    const { collectionName } = model.collection; // "users"
    const basePath = `/${collectionName}`; // "/users"

    app.route(basePath)
      // .get(paginationMiddleware, findUsersResolver)
      .get(findResolver(model))
      .post(createResolver(model));

    app.route(`${basePath}/:id`)
      .delete(deleteResolver)
      .get(findByIdResolver)
      .put(updateResolver);
  },
};

// translation keys? R: genéricas (ao invés de "USER_NOT_FOUND" -> "MODEL_NOT_FOUND")
// como gerar documentação automática usando the-owl? vish, aí vai ser super sayadin
