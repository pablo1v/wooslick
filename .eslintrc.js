module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['@hitechline/eslint-config/web'],
  globals: {
    __static: 'readonly',
  },
};
