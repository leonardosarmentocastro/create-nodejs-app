const mongoose = require('mongoose');

const DEFAULT = {
  model: mongoose.model('Users', new mongoose.Schema({ example: Boolean })),
};

const createResolver = (model = DEFAULT.instance) => async (req, res) => {
  const created = await model.create(req.body);
  return res.status(200).json(created.toObject());
};
const deleteResolver = (req, res) => res.status(200).json({ deleted: true });
const findResolver = (model = DEFAULT.instance) => async (req, res) => {
  const found = await model.find();
  return res.status(200).json(found);
};
const findByIdResolver = (req, res) => res.status(200).json({ read: true });
const updateResolver = (req, res) => res.status(200).json({ updated: true });

exports.crud = {
  connect(app, model = DEFAULT.model) {
    const { collectionName } = model.collection;
    const basePath = `/${collectionName}`;
    console.log('@ basePath', basePath)

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
