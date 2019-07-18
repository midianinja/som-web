import fetch from 'node-fetch';
import apollo from '../../../apollo';
import { createUserMutation } from './mutations';

export async function createIDA(username, password) {
  return fetch('http://localhost:3001/auth/signup', {
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

export async function createUserSOM(ida) {
  return apollo.mutate({
    mutation: createUserMutation,
    variables: {
      user: { ida },
    },
  });
}

export const ignore = null;
