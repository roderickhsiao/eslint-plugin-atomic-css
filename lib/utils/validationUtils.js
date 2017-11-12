const utils = require('./atomicUtils');

/**
 * Function to get validation results
 * @param  {String} value    value to test
 * @param  {Function} validate function to validate
 * @return {String}          error message
 */
function checkValidation(value, validate, options) {
  const classNames = utils.getAtomicClassName(value);
  let error;
  classNames.forEach((className) => {
    const match = utils.getAtomicObject(className);
    error = validate(match, options);
  });
  return error;
}

module.exports = {
  checkValidation
};
