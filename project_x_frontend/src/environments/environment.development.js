// eslint-disable-next-line no-var
var __env;
const env = __env || {};

export const environment = {
  env: 'development',
  server: env?.server || 'http://localhost:8080',
  domain: typeof window !== 'undefined' ? window.location.origin : '',
};
