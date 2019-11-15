import fetch from 'node-fetch';
import apollo from '../../../apollo';
import { oneUserQuery } from './queries';

export async function getUser(ida) {
  return apollo.query({
    query: oneUserQuery,
    variables: {
      ida,
    },
  });
}
export async function authorize(username, password) {
  return fetch(`${process.env.AUTH_API_URI}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export async function getIDA(ida) {
  return fetch(`${process.env.AUTH_API_URI}/user/${ida}`, {
    method: 'GET',
    mode: 'no-cors', // no-cors, *cors, same-origin
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export const ignore = null;
