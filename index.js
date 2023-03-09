import localtunnel from 'localtunnel';

const subdomain = process.argv[2];
const port = process.argv[3] || 3000;

const tunnel = localtunnel(port, { subdomain }, (err, tunnel) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Your app is available at ${tunnel.url}`);
});

tunnel.on('close', () => {
  console.log('Tunnel closed');
});