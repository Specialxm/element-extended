// Commitlint 配置
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  prompt: {
    types: [
      { value: 'feat', name: 'feat:     新功能', emoji: '✨' },
      { value: 'fix', name: 'fix:      修复bug', emoji: '🐛' },
      { value: 'docs', name: 'docs:     文档更新', emoji: '📝' },
      { value: 'style', name: 'style:    代码格式调整', emoji: '💄' },
      { value: 'refactor', name: 'refactor: 重构', emoji: '♻️' },
      { value: 'perf', name: 'perf:     性能优化', emoji: '⚡' },
      { value: 'test', name: 'test:     测试相关', emoji: '✅' },
      { value: 'build', name: 'build:    构建相关', emoji: '📦' },
      { value: 'ci', name: 'ci:        CI/CD相关', emoji: '🚀' },
      { value: 'chore', name: 'chore:    其他杂项', emoji: '🔧' },
      { value: 'revert', name: 'revert:   回滚', emoji: '⏪' },
      { value: 'wip', name: 'wip:      开发中', emoji: '🚧' },
      { value: 'workflow', name: 'workflow: 工作流', emoji: '📋' },
      { value: 'types', name: 'types:    类型定义', emoji: '🔍' }
    ],
    scopes: [
      { name: 'components', description: '组件相关' },
      { name: 'utils', description: '工具函数' },
      { name: 'styles', description: '样式相关' },
      { name: 'deps', description: '依赖相关' },
      { name: 'other', description: '其他' }
    ],
    /**
     * 中英文对照版
     * tip 中文有可能兼容不太好
     */
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    skipQuestions: ['body', 'breaking', 'footer'],
    subjectLimit: 100,
    subjectSeparator: ': ',
    subjectPattern: '^[a-z0-9-_()\\s]+$',
    subjectPatternErrorMsg:
      '主题必须是小写字母、数字、连字符、下划线、括号或空格',
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    issuePrefixes: [{ value: 'closed', name: 'closed:   ' }],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: 100,
    maxSubjectLength: 100,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码格式调整
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI/CD相关
        'chore', // 其他杂项
        'revert', // 回滚
        'wip', // 开发中
        'workflow', // 工作流
        'types' // 类型定义
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100]
  }
}

export default commitlintConfig
