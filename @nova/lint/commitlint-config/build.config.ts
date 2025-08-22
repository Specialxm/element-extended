import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ['src/index'],
  rollup: {
    emitCJS: true // 让 unbuild 生成 index.cjs（否则只有 index.mjs）
  }
})
