import fetch from 'node-fetch';

export async function requestResetPassword(input) {
  return fetch(`${process.env.AUTH_API_URI}/request-reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input,
    }),
  });
}

export async function validateResetPasswordToken(token) {
  return fetch(`${process.env.AUTH_API_URI}/validate-reset-password-token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  });
}

export async function resetPassword(token, password) {
  return fetch(`${process.env.AUTH_API_URI}/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      password,
    }),
  });
}
