module.exports = {};
/**
 * Enforce all colors should follow same case
 * @author Roderick Hsiao
 */
const get = require('lodash/get');
const utils = require('../../utils/atomicUtils');
const validationUtils = require('../../utils/validationUtils');

const DEFAULT_CASE = 'lower';

const getErrorMessage = (letterCase = DEFAULT_CASE, value) => {
  if (letterCase === 'lower') {
    return `expecting ${value.toLowerCase()} but is ${value}`;
  }
  return `expecting ${value.toUpperCase()} but is ${value}`;
};

const validate = (match, option = DEFAULT_CASE) => {
  if (match) {
    const { atomicValues } = match;
    if (atomicValues) {
      const parsedValue = utils.getGrammarValue(atomicValues);
      const { hex } = parsedValue;
      if (hex) {
        if (option === 'lower') {
          if (hex !== hex.toLowerCase()) {
            return getErrorMessage('lower', hex);
          }
        } else if (hex !== hex.toUpperCase()) {
          return getErrorMessage('upper', hex);
        }
      }
    }
  }
  return null;
};

module.exports = {
  create: (context) => {
    const option = get(context, ['options', 0]);
    const nodesToCheck = {
      VariableDeclaration: (node) => {
        node.declarations.forEach((variableDeclarator) => {
          const value = get(variableDeclarator, ['init', 'value']);
          const error = validationUtils.checkValidation(
            value,
            validate,
            option
          );
          if (error) {
            context.report(node, error);
          }
        });
      },
      JSXOpeningElement: (node) => {
        const classNameValue = utils.getClassNameValue(node);
        const error = validationUtils.checkValidation(
          classNameValue,
          validate,
          option
        );
        if (error) {
          context.report(node, error);
        }
      }
    };
    return nodesToCheck;
  },
  meta: {
    docs: {
      description: 'disallow different case hex color',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [
      {
        enum: ['upper', 'lower']
      }
    ]
  }
};
