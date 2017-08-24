const utils = require('./atomicUtils');

/**
 * Function to get validation results
 * @param  {String} value    value to test
 * @param  {Function} validate function to validate
 * @param  {Array<String>}   values to exclude for validation
 * @return {String}          error message
 */
function checkValidation(value, validate, excludes) {
  const classNames = utils.getAtomicClassName(value);
  let error;
  classNames.forEach((className) => {
    const match = utils.getAtomicObject(className);
    error = validate(match, excludes);
  });
  return error;
}

module.exports = {
  checkValidation
};
