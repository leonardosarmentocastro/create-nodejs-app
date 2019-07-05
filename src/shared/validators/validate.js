// TODO 1: maybe move this file one level up?
// TODO 2: maybe rename it to "sharedValidator"?
// TODO 3: maybe rename all "validators" to "validations"? (prob not, the naming convention is good)
exports.validate = (constraints, doc) =>
  constraints
    .reduce(async (err, constraint) => {
      if (!!(await err)) return err;

      const { validator, ...error } = constraint(doc);
      const isValid = await validator();
      return isValid ? null : error;
    }, null);
