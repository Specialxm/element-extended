import type { Linter } from 'eslint'

import { vue, javascript, typescript, prettier, ignores } from './configs'

type FlatConfig = Linter.Config

type FlatConfigPromise =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    vue(),
    javascript(),
    ignores(),
    typescript(),
    prettier(),
    ...config
  ]

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

export { defineConfig }
