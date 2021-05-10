const { paginationMiddleware } = require('@leonardosarmentocastro/pagination');

const { DEFAULTS } = require('./defaults');
const {
  createResolver,
  readResolver,
  readByIdResolver,
  updateResolver,
  deleteResolver,
} = require('./resolvers');

// TODO: como gerar documentação automática usando the-owl? vish, aí vai ser super sayadin
// Injeta o model num método que executa os tests e gera documentação. Uma engenharia reversa.
exports.crud = {
  connect(app, model = DEFAULTS.model) {
    const { collectionName } = model.collection; // "users"
    const basePath = `/${collectionName}`; // "/users"
    console.log(`[ crud::info ] creating routes for "${basePath}"`);

    app.route(basePath)
      .get(paginationMiddleware, readResolver(model))
      .post(createResolver(model));

    app.route(`${basePath}/:id`)
      .delete(deleteResolver(model))
      .get(readByIdResolver(model))
      .put(updateResolver(model));
  },
};
