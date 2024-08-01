/* eslint-disable import/no-dynamic-require */
const config = require(`./environment.${process.env.APP_ENV || process.env.NODE_ENV || 'development'}`);
export const { environment } = config;
