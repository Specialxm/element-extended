import type { Linter } from 'eslint'

import js from '@eslint/js'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export async function javascript(): Promise<Linter.Config[]> {
  return [
    {
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly'
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 'latest',
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      linterOptions: {
        reportUnusedDisableDirectives: true
      },
      plugins: {
        'unused-imports': pluginUnusedImports
      },
      rules: {
        ...js.configs.recommended.rules
      }
    }
  ]
}
