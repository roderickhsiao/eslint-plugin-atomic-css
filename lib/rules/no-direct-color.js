/**
 * Enforce all colors should declare as a variable
 * @author Roderick Hsiao
 */

'use strict';

const get = require('lodash/get');
const utils = require('../utils/atomicUtils');
const validationUtils = require('../utils/validationUtils');

const validate = function(match, excludes) {
  if (match) {
    const atomicValue = match.atomicValues;
    if (atomicValue) {
      const parsedValue = utils.getGrammarValue(atomicValue);
      const hex = parsedValue.hex;
      if (!hex || (excludes && excludes.includes(hex))) {
        return;
      }
      return 'Suggest to use variable instead of direct color code';
    }
  }
};

module.exports = {
  create: context => {
    const excludes = get(context, ['options', 1]);
    return {
      VariableDeclaration: node => {
        node.declarations.forEach(variableDeclarator => {
          const value = get(variableDeclarator, ['init', 'value']);
          const error = validationUtils.checkValidation(value, validate, excludes);
          if (error) {
            context.report(node, error);
          }
        });
      },
      JSXOpeningElement: node => {
        const classNameValue = utils.getClassNameValue(node);
        const error = validationUtils.checkValidation(classNameValue, validate, excludes);
        if (error) {
          context.report(node, error);
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'disallow direct color',
      recommended: true
    }
  },
  schema: [
    {
      enum: ['always', 'never']
    },
    {
      type: 'array'
    }
  ]
};
