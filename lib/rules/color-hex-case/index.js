module.exports = {};
/**
 * Enforce all colors should declare as a variable
 * @author Roderick Hsiao
 */
const get = require('lodash/get');
const utils = require('../../utils/atomicUtils');
const validationUtils = require('../../utils/validationUtils');

const getErrorMessage = (letterCase = 'lower', value) => {
  if (letterCase === 'lower') {
    return `expecting ${value.toLowerCase()} but is ${value}`;
  }
  return `expecting ${value.toUpperCase()} but is ${value}`;
};

const validate = (match, option = 'lower') => {
  if (match) {
    const { atomicValue } = match;
    if (atomicValue) {
      const parsedValue = utils.getGrammarValue(atomicValue);
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
    const option = get(context, ['options', 1]);
    return {
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
  },
  meta: {
    docs: {
      description: 'disallow hex color',
      category: 'Possible Errors',
      recommended: true
    }
  },
  schema: [
    {
      enum: ['always', 'never'] // TODO, not sure what this is
    },
    {
      enum: ['upper', 'lower']
    }
  ]
};
