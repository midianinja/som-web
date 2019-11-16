import fetch from 'node-fetch';
import apollo from '../../../apollo';
import { createUserMutation } from './mutations';
import { oneUserQuery } from './queries';

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
      user: { ida, likes: [] },
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

export async function sendValidationEmail(ida, email) {
  return fetch(`${process.env.AUTH_API_URI}/send-email-validation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ida,
      email,
    }),
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

export async function getUser(ida) {
  return apollo.query({
    query: oneUserQuery,
    variables: {
      ida,
    },
  });
}
