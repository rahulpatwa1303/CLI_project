const chalk = require('chalk');
const clear = require('console-clear')

function run(){
  const name = "moles"
  const version = "v1.1"
  clear()
  const {columns} = process.stdout;

  const topLeft = chalk.yellow(`${name}`)
  const topRight = chalk.yellow(`${version}`)

  const padding = ' '.repeat(columns - topLeft.length - topRight.length)
  console.log(`${topLeft} ${padding} ${topRight}`)
}

module.exports = {run}