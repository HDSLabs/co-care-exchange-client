import { Auth } from 'aws-amplify';

export const forgetPassword = async username => {
  return await Auth.forgotPassword(username);
};

export const forgetPasswordComplete = async (username, code, newPassword) => {
  return await Auth.forgotPasswordSubmit(username, code, newPassword);
};

export const changePassword = async (user: any, oldPassword: string, newPassword: string) => {
  return await Auth.changePassword(user, oldPassword, newPassword);
};
