module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'indentation': 2,
    'string-quotes': 'single',

    'function-url-quotes': 'always',
    'number-leading-zero': 'always',
    'comment-whitespace-inside': 'always',

    'no-duplicate-selectors': true,
    'no-descending-specificity': null,

    'color-named': 'never',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',

    'custom-property-empty-line-before': null,

    'font-family-name-quotes': 'always-where-recommended',
    'font-family-no-missing-generic-family-keyword': null,

    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-block-no-shorthand-property-overrides': null,

    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    'selector-max-id': 0,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],
  },
};
