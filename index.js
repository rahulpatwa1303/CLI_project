
import chalk from 'chalk';
import localtunnel from 'localtunnel';
import promptSync from 'prompt-sync';
import * as fs from 'fs';
import os from "os";
import express from 'express';
import {spawn} from 'child_process';
const app = express();
// console.log(chalk.blue(os.type()));
const path = "./lt_config";
const prompt = promptSync();
async function connect(){
    
    var port 
    var address 
    if (fs.existsSync(path)) {
        fs.readFile('./lt_config/config.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let jsonData = JSON.parse(data);
            port = jsonData.port
            address = jsonData.addr
            localtunnel(port, { subdomain: address }, (err, tunnel) => {
                if (err) throw console.log(err);
                console.log(chalk.bgWhite(chalk.black(`Forwarding ${tunnel.url}  -> http://localhost:${port}`)));
            })
        });
    } else {
        const regex = /^[0-9]{4,}$/;
        do {
            port = prompt(chalk.yellow('Configure port that you want to expose '));
          } while (!regex.test(port));
        address = prompt(chalk.yellow('Configure a customized DNS '))
        if(!address){
            console.log(chalk.white('Since not customized DNS was given, a random string would be generated'))
        }
        if(address && /\./.test(address)){
            address = prompt(chalk.red("Customized DNS can't have (.) in between "))
        }
        localtunnel(port, { subdomain: address }, (err, tunnel) => {
            if (err) throw console.log(err);
            console.log(chalk.bgWhite(chalk.black(`Forwarding ${tunnel.url} -> http://localhost:${port}`)));
        })
        await fs.promises.mkdir('lt_config', { recursive: true })
        let Configuration = {
            "port": port,
            "addr" : address,
            "proto" : "http"
        }
        await fs.promises.writeFile('lt_config/config.json',JSON.stringify(Configuration))
    }
    spawn(path.join(process.cwd(),'index.js'))

}

app.listen(4042,()=>connect())