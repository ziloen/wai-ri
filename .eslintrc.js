/** @type import('eslint').Linter.Config */
module.exports = {
  extends: '@ziloen',
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['.*', '*.config.js', '*.config.ts'],
  rules: {
    'no-promise-executor-return': 'off',
    '@typescript-eslint/promise-function-async': 'off'
  },
  overrides: [
    {
      files: ["*.test.ts"],
      rules: { 'no-undef': 'off' }
    }
  ]
}