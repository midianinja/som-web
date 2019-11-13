import fetch from 'node-fetch';
import apollo from '../../apollo';
import { oneUserQuery } from './queries';

export async function validateToken(ida, token) {
  return fetch(`${process.env.AUTH_API_URI}/validate-email-token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ida,
      token,
    }),
  });
}

export async function getUser(ida) {
  return apollo.query({
    query: oneUserQuery,
    variables: {
      ida,
    },
  });
}

export async function getIDA(ida) {
  return fetch(`${process.env.AUTH_API_URI}/user/${ida}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
