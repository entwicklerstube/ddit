import server from './service/server';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.npm_package_config_prodport || 8000;
const DEV_PORT = process.env.npm_package_config_devport || 3000;

if (NODE_ENV === 'development') {
  require('./service/dev-server').listen(DEV_PORT, PORT);
}

server.listen(PORT, () => {
  console.log('NODE_ENV =', process.env.NODE_ENV);
  console.log('Server listening on', PORT);
});
