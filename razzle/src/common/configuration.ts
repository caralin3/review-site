export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {
      RAZZLE_RUNTIME_FRONTEND: 'react' | 'vue' | undefined;
      RAZZLE_FRONTEND: 'react' | 'vue' | undefined;
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export interface RuntimeConfiguration {
  env: 'development' | 'production';
  frontend: 'react' | 'vue';
}
