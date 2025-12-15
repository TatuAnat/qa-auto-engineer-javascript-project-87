#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')

program.parse(process.argv)

const options = program.opts()
const args = program.args

if (args.length < 2) {
  console.error("error: missing required argument(s) 'filepath1' and 'filepath2'")
  program.help({ error: true })
} else {
  const [filepath1, filepath2] = args
  try {
    console.log(genDiff(filepath1, filepath2, options.format))
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}