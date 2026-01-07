#!/usr/bin/env node

import { Command } from 'commander'
import path from 'node:path'
import genDiff from '../src/index.js'

const program = new Command()

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const resolved1 = path.resolve(process.cwd(), filepath1)
    const resolved2 = path.resolve(process.cwd(), filepath2)

    try {
      const result = genDiff(resolved1, resolved2, program.opts().format)
      if (program.opts().format === 'json') {
        console.log(JSON.stringify(result, null, 2))
      }
      else {
        console.log(result)
      }
    }
    catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  })

program.parse(process.argv)
