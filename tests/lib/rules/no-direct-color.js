const rule = require('../../../lib/rules/no-direct-color');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});
const ruleTester = new RuleTester();

ruleTester.run('no-direct-color', rule, {
  valid: [
    { code: 'const a = "C($red)";' },
    {
      code: 'var a = "C(#fff)";',
      options: ['always', ['#fff']]
    },
    {
      code: '<Component className="C($red)" />'
    },
    {
      code: '<Component className="C(#fff.4)" />',
      options: ['always', ['#fff']]
    }
  ],
  invalid: [
    { code: 'const a = "C(#fff)";', errors: 1 },
    { code: 'const a = "Bgc(#000.3)";', errors: 1 },
    { code: '<Component className="C(#fff)" />', errors: 1 }
  ]
});
