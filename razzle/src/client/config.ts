import { RuntimeConfiguration } from '../common';

const config: RuntimeConfiguration = {
  env: process.env.NODE_ENV,
  frontend:
    process.env.RAZZLE_RUNTIME_FRONTEND ||
    process.env.RAZZLE_FRONTEND ||
    'react'
};

export default config;
