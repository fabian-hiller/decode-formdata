
export default  {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
  ],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  // prettier-ignore
  // eslint-disable-next-line no-useless-escape
  importOrder: ['^\w', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
