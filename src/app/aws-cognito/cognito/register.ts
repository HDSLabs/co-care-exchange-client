// from https://aws-amplify.github.io/docs/js/authentication

import { Auth } from 'aws-amplify';
import { RegistrationResult } from '../../models/cce/registration-result.model';
import { BasicRegistrationModel } from '../../models/cce/basic-registration.model';
export const register = async (regModel: BasicRegistrationModel): Promise<RegistrationResult> => {
  const result: RegistrationResult = {};
  const attributes = {
    email: regModel.email,
    given_name: regModel.firstName,
    family_name: regModel.lastName,
    //  phone_number,   // optional - E.164 number convention
    // other custom attributes
  };
  if (regModel.phoneNumber) {
    attributes['phone_number'] = regModel.phoneNumber;
  }
  try {
    const registerResult = await Auth.signUp({
      username: regModel.email,
      password: regModel.password,
      attributes,
      validationData: [], // optional
    });
    console.log('DEBUG register result ', JSON.stringify(registerResult));
  } catch (err) {
    console.log(err);
    result.errorMsg = err.message || 'Registration error';
  }
  return result;
};

export const confirm = async (username, code) => {
  try {
    // After retrieving the confirmation code from the user
    const result = await Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const resend = async username => {
  try {
    const result = await Auth.resendSignUp(username);
  } catch (err) {
    console.log(err);
  }
};
