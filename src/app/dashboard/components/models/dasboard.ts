import { Agreement } from './agreement';

export class Result {
  data: any = {
    dashboard: {
      requested: [Agreement],
      shared: [Agreement],
    },
  };
}
