const AtomizerLib = require('atomizer');
const grammar = require('atomizer/src/lib/grammar');
const jsxASTUtils = require('jsx-ast-utils');
const rules = require('atomizer/src/rules');
const XRegExp = require('xregexp');

const Atomizer = new AtomizerLib();
const classNameSyntax = Atomizer.getSyntax(true);

function getAtomicClassName(value) {
  return Atomizer.findClassNames(value);
}

function getAtomicObject(className) {
  return XRegExp.exec(className, classNameSyntax);
}

function getAtomicRules() {
  return rules;
}

function getGrammarValue(value) {
  return grammar.matchValue(value);
}

function getClassNameValue(node) {
  const className = jsxASTUtils.getProp(node.attributes, 'className');
  const value = jsxASTUtils.getPropValue(className);
  return value;
}

module.exports = {
  getAtomicClassName,
  getAtomicObject,
  getAtomicRules,
  getClassNameValue,
  getGrammarValue
};
