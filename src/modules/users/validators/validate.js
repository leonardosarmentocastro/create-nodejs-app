exports.validate = (constraints, userDoc) =>
  constraints
    .reduce(async (err, constraint) => {
      if (!!(await err)) return err;

      const { validator, ...error } = constraint(userDoc);
      const isValid = await validator();
      return isValid ? null : error;
    }, null);
