#!/usr/bin/env node

const localtunnel = require('localtunnel');
const chalk = require('chalk');
const promptSync = require('prompt-sync')();
const fs = require('fs');
const os = require('os');

async function connect(){
  const path = "./lt_config";
    var port 
    var subdomain 
    if (fs.existsSync(path)) {
        fs.readFile('./lt_config/config.json', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
            let jsonData = JSON.parse(data);
            port = jsonData.port
            subdomain  = jsonData.addr
            const options  = subdomain  ? { subdomain  } : {};
            localtunnel(port,options, (err, tunnel) => {
              if (err) {
                console.error(err);
                process.exit(1);
              }
              console.log(chalk.underline('Give me moment while I create a tunnel'))
              console.log(chalk.bgWhite(chalk.black(`Forwarding ${tunnel.url}  -> http://localhost:${port}`)));
            })
          });
        } else {
        const regex = /^[0-9]{4,}$/;
        do {
          port = promptSync(chalk.yellow('Configure port that you want to expose '));
        } while (!regex.test(port));

        subdomain = promptSync(chalk.yellow('Configure a customized DNS '))

        if(!subdomain ){
          console.log(chalk.white('Since not customized DNS was given, a random string would be generated'))
        }

        if(subdomain && /\./.test(subdomain )){
          subdomain  = promptSync(chalk.red("Customized DNS can't have (.) in between "))
        }
        
        const options  = subdomain  ? { subdomain  } : {};
        localtunnel(port,options, (err, tunnel) => {
          console.log(chalk.underline('Give me moment while I create a tunnel'))
          if (err) {
            console.error(err);
            process.exit(1);
          }
            console.log(chalk.bgWhite(chalk.black(`Forwarding ${tunnel.url} -> http://localhost:${port}`)));
        })
        await fs.promises.mkdir('lt_config', { recursive: true })
        let Configuration = {
            "port": port,
            "addr" : subdomain,
            "proto" : "http"
        }
        await fs.promises.writeFile('lt_config/config.json',JSON.stringify(Configuration))
    }

}
connect()