import { Role } from './role.model';

export class CognitoUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name: string;
  roles: Role[];
  token: string;
  resetCode: string;
  navToLessons: boolean;
  resetToken: string;
  verificationToken: string;

  constructor(data: any) {
    if (!data) {
      return;
    }
    const self = this;
    Object.keys(data).forEach(function(key) {
      self[key] = data[key];
    });
  }
}
