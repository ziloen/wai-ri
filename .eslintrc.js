module.exports = {
  extends: ["@ziloen/eslint-config-typescript"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['/**/*.*', '!packages/**/*.*'],
}