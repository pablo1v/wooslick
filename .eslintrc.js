module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['@hitechline', '@hitechline/eslint-config/web'],
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
