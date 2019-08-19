exports.sharedUtils = {
  // Pick object's nested fields.
  // Reference: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
  get: (obj, path, defaultValue) => {
    const result = String.prototype.split.call(path, /[,[\].]+?/)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj);
    return (result === undefined || result === obj) ? defaultValue : result;
  },
};
