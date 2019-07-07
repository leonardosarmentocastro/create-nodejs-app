exports.sharedValidate = (constraints, value) =>
  constraints
    .reduce(async (err, constraint) => {
      if (!!(await err)) return err;

      const { validator, ...error } = constraint(value);
      const isValid = await validator();
      return isValid ? null : error;
    }, null);
