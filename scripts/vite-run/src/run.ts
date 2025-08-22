import { getPackages } from '@nova/utils'
import inquirer from 'inquirer'
import { execaCommand } from 'execa'

export default async function init(command: string) {
  try {
    if (!command) {
      console.error('请输入要运行的命令')
      process.exit(1)
    }
    const { packages } = await getPackages()

    // 只显示有对应命令的包
    const selectPkgs = packages.filter(
      (pkg: { packageJson: Record<string, any> }) => {
        return (pkg?.packageJson as Record<string, any>)?.scripts?.[command]
      }
    )
    // 选择入口
    const { appName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'appName',
        message: `请选择要运行的应用 [${command}]`,
        choices: selectPkgs.map((pkg: { packageJson: { name: string } }) => {
          return {
            name: pkg.packageJson.name,
            value: pkg.packageJson.name
          }
        })
      }
    ])

    console.log(`🚀 正在启动: ${appName}`)

    if (!appName) {
      console.error('❌ 未找到任何可运行的应用，请确认目录下有可运行应用')
      process.exit(1)
    }

    // 运行
    execaCommand(`pnpm --filter=${appName} run ${command}`, {
      stdio: 'inherit'
    })
  } catch (err: any) {
    if (err.isTtyError) {
      console.error('❌ 当前终端不支持交互式选择，请使用参数直接指定应用')
    } else {
      console.log('🚪 已取消运行')
    }
    process.exit(1)
  }
}
