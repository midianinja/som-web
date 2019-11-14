import fetch from 'node-fetch';
import emailValidation from './validations';

export async function sentEmail(email, setError) {
  setError(emailValidation(email));
  //  return fetch(`${process.env.AUTH_API_URI}/forgetPassword`, {
  //    method: 'POST',
  //    headers: {
  //      Accept: 'application/json',
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({
  //      email,
  //    }),
  //  });
}

export const ignore = null;
