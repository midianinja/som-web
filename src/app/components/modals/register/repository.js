import fetch from 'node-fetch';
import apollo from '../../../apollo';
import { createUserMutation } from './mutations';

export async function createIDA(username, password) {
  return fetch(`${process.env.AUTH_API_URI}/signup`, {
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
      user: { ida, artists: [], likes: [] },
    },
  });
}

export async function generatePhoneCode(ida, phone) {
  return fetch(`${process.env.AUTH_API_URI}/phone-generate-code`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ida,
      phone,
    }),
  });
}

export async function validatePhoneCode(ida, code) {
  return fetch(`${process.env.AUTH_API_URI}/phone-validate-code`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ida,
      code,
    }),
  });
}
