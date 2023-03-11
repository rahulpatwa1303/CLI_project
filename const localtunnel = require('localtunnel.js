const localtunnel = require('localtunnel');
const chalk = require('chalk');
const promptSync = require('prompt-sync')();

const fs = require('fs');

async function connect(){
  
  var port;
  var subdomain;
  const dir = "./lt_config";
  var c = {}

  
  const funccall = async(port,subdomain) => {  
    console.log('port,subdomain')
    console.log(port,subdomain)
    try {
      const tunnel = await localtunnel({ port, subdomain,printRequests:true });
      console.log(`Tunnel created at: ${tunnel.url}`);
      tunnel.on('request',function(req){
        console.log(req.method,req.path)
      })
    } catch (error) {
      console.error('Error creating tunnel:', error);
    }
  }

  if (fs.existsSync(dir)) {
    fs.readFile('./lt_config/config.json', 'utf8', (err, data) => {
      let jsonData = JSON.parse(data);
      port = jsonData.port
      subdomain  = jsonData.addr
      c = {port, subdomain}
      funccall(port, subdomain)
    })
  }
  else{
    const regex = /^[0-9]{4,}$/;
    do {
      port = promptSync(chalk.yellow('Configure port that you want to expose '));
      } 
      while (!regex.test(port));
      
    subdomain = promptSync(chalk.yellow('Configure a customized DNS '))
    
    if(!subdomain ){
      console.log(chalk.white('Since not customized DNS was given, a random string would be generated'))
    }
    
    if(subdomain && /\./.test(subdomain )){
      subdomain  = promptSync(chalk.red("Customized DNS can't have (.) in between "))
    }
    
    c = {port, subdomain}
    funccall(port, subdomain)

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