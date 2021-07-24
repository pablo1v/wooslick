module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['@hitechline', '@hitechline/eslint-config/web'],
  globals: {
    HEADER_WEBPACK_ENTRY: 'readonly',
    HEADER_PRELOAD_WEBPACK_ENTRY: 'readonly',
    VIEW_WEBPACK_ENTRY: 'readonly',
    VIEW_PRELOAD_WEBPACK_ENTRY: 'readonly',
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
        ],
      },
    ],
  },
};
