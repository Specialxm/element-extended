export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/iconfont/*.(css|scss)'
  ],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          { ignorePseudoClasses: ['global', 'deep'] }
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] }
        ]
      }
    },
    {
      customSyntax: 'postcss-scss',
      extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue/scss'
      ],
      files: ['*.scss', '**/*.scss']
    }
  ],
  plugins: [
    'stylelint-order',
    '@stylistic/stylelint-plugin',
    'stylelint-prettier',
    'stylelint-scss'
  ],
  rules: {
    // 完全跳过 Tailwind 校验
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,

    'at-rule-no-deprecated': null,
    'font-family-no-missing-generic-family-keyword': null,
    'function-no-unknown': null,
    'import-notation': null,
    'media-feature-range-notation': null,
    'named-grid-areas-no-invalid': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'no-invalid-position-at-import-rule': null,

    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        { name: 'supports', type: 'at-rule' },
        { name: 'media', type: 'at-rule' },
        { name: 'include', type: 'at-rule' },
        'rules'
      ],
      { severity: 'error' }
    ],

    // 格式化相关
    'prettier/prettier': [true, { htmlWhitespaceSensitivity: 'ignore' }],
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'first-nested'] }
    ],
    'scss/operator-no-newline-after': null,
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:[.+])?$',
    'selector-not-notation': null
  }
}
