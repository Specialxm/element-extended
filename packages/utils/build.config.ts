import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true
  },
  failOnWarn: false,
  externals: ['vue', '@vue/runtime-core', '@vue/reactivity', '@vue/shared']
})
