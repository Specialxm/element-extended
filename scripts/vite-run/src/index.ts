import { Command } from 'commander'
import pkg from '../package.json'
import init from './run'

const { version, description } = pkg

const program = new Command()

program
  .name('vite-run')
  .version(version)
  .description(description)
  .argument('[mode]', 'vite command (dev/build/preview)', 'dev')
  .action(init)

program.parse()
