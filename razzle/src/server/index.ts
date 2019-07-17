import bodyParser from 'body-parser';
import express from 'express';
import config from '../client/config';
// import { createRoutes } from './routes';
import * as reactWeb from './react-website';

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(bodyParser.json());

// createRoutes(server);

// if (config.frontend === 'vue') {
//   server.get('*', vueWeb.render);
// } else {
server.get('*', reactWeb.render);
// }

export default server;
