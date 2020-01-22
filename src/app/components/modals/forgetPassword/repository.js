import axios from 'axios';

export async function requestResetPassword(input) {
  return axios.post(`${process.env.AUTH_API_URI}/request-reset-password`, {
    input,
  });
}

export async function validateResetPasswordToken(token) {
  return axios.post(`${process.env.AUTH_API_URI}/validate-reset-password-token`, {
    token,
  });
}

export async function resetPassword(token, password) {
  return axios.post(`${process.env.AUTH_API_URI}/reset-password`, {
    token,
    password,
  });
}
