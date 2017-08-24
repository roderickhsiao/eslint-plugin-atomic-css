const rule = require('../index');
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

ruleTester.run('color-hex-case', rule, {
  valid: [
    { code: 'const a = "C(#fff)";' },
    { code: 'const a = "C(#ffffff)";' },
    { code: 'const a = "Bgc(#000)";' },
    {
      code: '<Component className="C(#FFF.4)" />',
      options: ['always', 'upper']
    }
  ],
  invalid: [
    { code: 'const a = "C(#FFF)";', errors: 1 },
    {
      code: '<Component className="C(#fff.4)" />',
      options: ['always', 'upper'],
      errors: 1
    }
  ]
});
