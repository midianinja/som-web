import { requestResetPassword, validateResetPasswordToken, resetPassword } from './repository';
import inputValidation, { isEmail, isPhone } from './validations';

export async function sendLink(input) {
  const validation = inputValidation(input);
  if (!isEmail(input) && !isPhone(input)) {
    return { result: false, message: validation };
  }

  let promise;
  const inputFormatted = isPhone(input) ? `+55${input}` : input;
  try {
    promise = await requestResetPassword(inputFormatted);
  } catch (error) {
    throw (error);
  }

  const { data, error } = await promise.json();
  const message = error ? 'e-mail ou número não encontrado' : '';
  if (error) return { result: false, message };


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
  const { data, error } = await promise.json();
  return data;
}

export async function sendNewPassword(token, password) {
  let promise;
  console.log(password, token);
  try {
    promise = await resetPassword(token, password);
  } catch (error) {
    throw (error);
  }
  // se tem data, token válido
  const { data, error } = await promise.json();

  return data;
}
