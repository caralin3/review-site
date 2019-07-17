import config from './config';

if (config.frontend === 'vue') {
  // import('./vue');
} else {
  import('./react');
}
