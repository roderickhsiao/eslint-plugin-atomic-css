/**
 * Enforce all colors should declare as a variable
 * @author Roderick Hsiao
 */

'use strict';

const find = require('lodash/find');
const get = require('lodash/get');
const jsxASTUtils = require('jsx-ast-utils');

const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

const utils = require('../utils/atomicUtils');

function checkValidation(value, excludes) {
  const classNames = utils.getAtomicClassName(value);
  let error;
  classNames.forEach(className => {
    const match = utils.getAtomicObject(className);
    if (match) {
      const values = match.atomicValues;
      if (values) {
        values.split(',').forEach(value => {
          const parsedValue = utils.getGrammarValue(value);
          const hex = parsedValue.hex;
          if (!hex || (excludes && excludes.includes(hex))) {
            return;
          }

          error = 'Suggest to use variable instead of direct color code';
          return;
        });
      }
    }
  });
  return error;
}

module.exports = {
  create: context => {
    const excludes = get(context, ['options', 1]);
    return {
      VariableDeclaration: node => {
        node.declarations.forEach(variableDeclarator => {
          const value = get(variableDeclarator, ['init', 'value']);
          const error = checkValidation(value, excludes);
          if (error) {
            context.report(node, error);
          }
        });
      },
      JSXOpeningElement: node => {
        const className = jsxASTUtils.getProp(node.attributes, 'className');
        const value = jsxASTUtils.getPropValue(className);
        const error = checkValidation(value, excludes);
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
