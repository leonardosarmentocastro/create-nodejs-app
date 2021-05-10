const { DEFAULTS } = require('./defaults');
const { createResolver } = require('./resolvers');

const deleteResolver = (req, res) => res.status(200).json({ deleted: true });
const findResolver = (model = DEFAULTS.model) => async (req, res) => {
  const found = await model.find();
  return res.status(200).json(found);
};
const findByIdResolver = (req, res) => res.status(200).json({ read: true });
const updateResolver = (req, res) => res.status(200).json({ updated: true });

// TODO: como gerar documentação automática usando the-owl? vish, aí vai ser super sayadin
exports.crud = {
  connect(app, model = DEFAULTS.model) {
    const { collectionName } = model.collection; // "users"
    const basePath = `/${collectionName}`; // "/users"
    console.log(`[ crud::info ] creating routes for "${basePath}"`);

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
