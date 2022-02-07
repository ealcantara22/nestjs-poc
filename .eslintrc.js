module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // "eslint:recommended",
    // "prettier"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // custom
    // 'comma-dangle': [
    //   2,
    //   'never'
    // ],
    // 'indent': [
    //   'error',
    //   2
    // ],
    'no-console': [
      2
    ],
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': 2,
    'no-var': 2,
    'prefer-arrow-callback': 1,
    'prefer-const': 2,
    'prefer-spread': 1,
    'prefer-template': 1,
    // 'jest/no-disabled-tests': 'warn',
    // 'jest/no-focused-tests': 'error',
    // 'jest/no-identical-title': 'error',
    // 'jest/prefer-to-have-length': 'warn',
    // 'jest/valid-expect': 'error',
    'prettier/prettier': 'error'
  },
};
