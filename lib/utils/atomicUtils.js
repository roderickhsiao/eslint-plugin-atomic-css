const atomizer = require('atomizer');
const grammar = require('atomizer/src/lib/grammar');
const rules = require('atomizer/src/rules');
const XRegExp = require('xregexp');

const Atomizer = new atomizer();
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
module.exports = {
  getAtomicRules,
  getAtomicClassName,
  getAtomicObject,
  getGrammarValue
};
