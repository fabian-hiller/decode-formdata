module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': ['error', 'always'],
  },
};
