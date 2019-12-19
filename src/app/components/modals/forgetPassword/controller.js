import { requestResetPassword, validateResetPasswordToken, resetPassword } from './repository';
import inputValidation, { isEmail, isPhone } from './validations';

export async function sendLink(input) {
  const validation = inputValidation(input);
  if (!isEmail(input) && !isPhone(input)) {
    return { result: false, message: validation };
  }

  const inputWithoutChars = input.replace(/\W/g, '');
  const inputPhoneFormatted = `+55${inputWithoutChars}`;
  const inputFormatted = isPhone(input) ? inputPhoneFormatted : input;
  let promise;

  try {
    promise = await requestResetPassword(inputFormatted);
  } catch (error) {
    const errorCode = error.response.data.error;
    if (errorCode === 'reset-password/user-not-found') {
      const message = 'e-mail ou número não encontrado';
      return { result: false, message };
    }
  }

  const { data } = promise.data;
  return { result: true, message: 'link enviado', data };
}

export async function validateToken(token) {
  let promise;
  try {
    promise = await validateResetPasswordToken(token);
  } catch (error) {
    throw (error);
  }
  // se tem data, token válido
  const { data } = promise.data;
  return data;
}

export async function sendNewPassword(token, password) {
  let promise;
  try {
    promise = await resetPassword(token, password);
  } catch (error) {
    throw (error);
  }
  // se tem data, token válido
  const { data } = promise.data;

  return data;
}
