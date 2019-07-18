import fetch from 'node-fetch';

export async function authorize(username, password) {
  return fetch('http://localhost:3001/auth/login', {
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

export const ignore = null;
