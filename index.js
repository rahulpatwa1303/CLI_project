const { Command } = require('commander');
const program = new Command();

program
  .option('-r, --run', 'Run a function')
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

const options = program.opts();
if (options.run) {
  const {run} = require('./commands')
  run()
}
