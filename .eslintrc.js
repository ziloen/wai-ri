/** @type import('@types/eslint').Linter.Config */
module.exports = {
  extends: ['@ziloen/eslint-config-typescript'],
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['/**/*.*', '!packages/**/*.*'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'no-promise-executor-return': 'off',
    '@typescript-eslint/promise-function-async': 'off'
  },
  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}