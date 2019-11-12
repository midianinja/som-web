import fetch from 'node-fetch';

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

export const ignore = () => null;
