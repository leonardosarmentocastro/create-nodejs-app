const { sanitizer } = require('@leonardosarmentocastro/database');

const { DEFAULTS } = require('../defaults');
const { translatedError } = require('../errors');

exports.createResolver = (model = DEFAULTS.model) => async (req, res) => {
  const payload = sanitizer(req.body);
  const doc = new model(payload);

  try {
    const savedDoc = await doc.save();
    const transformedDoc = savedDoc.toObject();

    return res.status(200).json(transformedDoc);
  } catch(err) {
    return translatedError(req, res, { err, doc });
  }
};
