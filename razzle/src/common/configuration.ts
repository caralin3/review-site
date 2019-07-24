export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {
      RAZZLE_RUNTIME_FRONTEND: 'react' | 'vue' | undefined;
      RAZZLE_FRONTEND: 'react' | 'vue' | undefined;
      RAZZLE_RUNTIME_DATABASE: 'loki' | undefined;
      RAZZLE_DATABASE: 'loki' | undefined;
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export interface CommonConfiguration {
  env: 'development' | 'production';
  frontend: 'react' | 'vue';
}

export interface RuntimeConfiguration extends CommonConfiguration {}

export interface CompileTimeConfiguration extends CommonConfiguration {
  database: 'loki';
}
