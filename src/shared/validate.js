// [RFC #MONOREPO-SHARED-VALIDATE]
// This module has so much power, everything about error detection/handling/translation is drived by this strategy.
// The key gotcha would be to expose `validate()` function and its commons most used `validators`, to show off
// how error handling show be addressed an reused on modules.
exports.sharedValidate = (constraints, doc) =>
  constraints
    .reduce(async (err, constraint) => {
      if (!!(await err)) return err;

      const { validator, ...error } = constraint(doc);
      const isValid = await validator();
      return isValid ? null : error;
    }, null);
