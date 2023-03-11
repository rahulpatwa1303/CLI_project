const { exec } = require("child_process")
const base_host = 'http://localtunnel.me'
 
class EasyTunnel {
    /**
     * 
     * @param {number} port 
     * @param {string} subdomain 
     * @param {string} [host] defaults to 'http://localtunnel.me'
     */
    constructor(port, subdomain, host) {
        this.port = port
        this.subdomain = subdomain
        this.host = host ? host : base_host
    }
    /**
     * Start the EasyTunnel
     * @param {string} [status] used so redigging does not show initial dig message
     */
    start(status) {
        if (status != 'redig') console.log(`> Dug a tunnel for ${this.subdomain} on port ${this.port.toString()} at ${this.host}`)
        exec(`lt --subdomain ${this.subdomain} --port ${this.port}`, async (err, out) => {
            if (err.toString().includes('connection refused')) {
                this.start("redig")
                console.log("> Redigging tunnel")
            }
        })
    }

}

module.exports = EasyTunnel