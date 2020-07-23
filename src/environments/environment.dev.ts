import { commonEnv } from './commonEnv';
import { awsEnv } from './awsEnv.qa';

export const environment = {
  ...commonEnv,
  ...awsEnv,
  serverUrl: 'https://dev-api.cocareexchange.org/graphql?',
  apiKey: 'GRWeLOBUoL9dY6OnduCiU14WXReuYo9E9I9EKfTt',
  production: false,
};
