import { CUPMap } from './cup-info.model';
import { environment } from '../../../environments/environment';

export const individualsAWSInfo: CUPMap = {
  CCE_Individual: {
    region: environment.aws.region,
    userPoolId: environment.aws.userPoolId,
    userPoolWebClientId: environment.aws.userPoolWebClientId,
    identityPoolId: environment.aws.identityPoolId,
  },
};
