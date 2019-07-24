import { CompileTimeConfiguration } from '../common';

const config: CompileTimeConfiguration = {
  env: process.env.NODE_ENV,
  database:
    process.env.RAZZLE_RUNTIME_DATABASE ||
    process.env.RAZZLE_DATABASE ||
    'loki',
  frontend:
    process.env.RAZZLE_RUNTIME_FRONTEND ||
    process.env.RAZZLE_FRONTEND ||
    'react'
};

export default config;
