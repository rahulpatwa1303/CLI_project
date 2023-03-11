const chalk = require('chalk');
const clear = require('console-clear')
const fs = require('fs');
const promptSync = require('prompt-sync')();

function run(){
  const name = "moles"
  const version = "v1.1"
  const quit = "(Ctrl+C to quit)"
  clear()
  const terminalWidth  = process.stdout.columns

  const molePadded = name.padEnd(terminalWidth - version.length - 1);
  const versionPadded = version.padStart(version.length + 1);

  console.log(chalk.yellow(molePadded) + chalk.yellow(versionPadded));

  const folder = './.moles'

  if (fs.existsSync(folder)) {
    process.stdout.write('\r\n');
    console.log(chalk.red('folder found'))
  }
  else{
    const regex = /^[0-9]{4,}$/;
    const dnsRegex = /^[a-z0-9]+$/
    process.stdout.write('\r\n');
    do {
      port = promptSync(chalk.yellow('Configure port that you want to expose '));
      } 
      while (!regex.test(port));

    subdomain = promptSync(chalk.yellow('Configure a customized DNS '))
    
    if(!subdomain ){
        console.log(chalk.white('Since not customized DNS was given, a random string would be generated'))
      }
      
    if(subdomain && !dnsRegex.test(subdomain)){
        subdomain  = promptSync(chalk.red("Customized DNS can't have (.) in between "))
      }

    fs.promises.mkdir('.moles', { recursive: true })
      let Configuration = [{
            "port": port,
            "addr" : subdomain
        }]
    fs.promises.writeFile('.moles/config.json',JSON.stringify(Configuration))
  }

}

module.exports = {run}