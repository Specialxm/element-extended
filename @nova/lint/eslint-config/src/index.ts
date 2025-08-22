import type { Linter } from 'eslint'

import {
  vue,
  importPluginConfig,
  javascript,
  typescript,
  prettier,
  jsonc,
  node,
  regexp,
  ignores
} from './configs'

type FlatConfig = Linter.Config

type FlatConfigPromise =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    vue(),
    importPluginConfig(),
    javascript(),
    ignores(),
    typescript(),
    prettier(),
    jsonc(),
    node(),
    regexp(),
    ...config
  ]

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

export { defineConfig }
