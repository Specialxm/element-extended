#!/usr/bin/env node
import { Command } from 'commander'
import { version } from '../package.json'

const program = new Command()

program
  .name('monorepo-cli')
  .description('Monorepo工程化项目命令行工具')
  .version(version)

program
  .command('build')
  .description('构建所有子项目')
  .action(() => {
    console.log('开始构建所有子项目...')
    // 这里添加构建逻辑
  })

program
  .command('dev')
  .description('启动开发模式')
  .action(() => {
    console.log('启动开发模式...')
    // 这里添加开发模式逻辑
  })

program.parse(process.argv)
