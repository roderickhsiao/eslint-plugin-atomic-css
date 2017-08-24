const rule = require('../../../lib/rules/color-no-hex');
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

ruleTester.run('color-no-hex', rule, {
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
      code: '<Component className="Bgc($red)" />'
    },
    {
      code: '<Component className="C(#fff.4)" />',
      options: ['always', ['#fff']]
    },
    {
      code: '<Component className="C(#fff.4)" />',
      options: ['always', ['#fff']]
    }
  ],
  invalid: [
    { code: 'const a = "C(#fff)";', errors: 1 },
    { code: 'const a = "Bgc(#000.3)";', errors: 1 },
    { code: '<Component className="C(#fff)" />', errors: 1 },
    {
      code: '<Component className="C(#fff.4) Bgc(#000)" />',
      options: ['always', ['#fff']],
      errors: 1
    },
    {
      code: 'const a = "C(#000)"; const b = <Component className="C(#fff.4) Bgc(#000)" />',
      errors: 2 // Should we return 3 errors instead?
    }
  ]
});
