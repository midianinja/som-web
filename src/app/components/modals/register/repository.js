import axios from 'axios';
import apollo from '../../../apollo';
import { createUserMutation } from './mutations';
import { oneUserQuery } from './queries';

export async function createIDA(username, password) {
  return axios.post(`${process.env.AUTH_API_URI}/signup`, {
    username,
    password,
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
  return axios.post(`${process.env.AUTH_API_URI}/phone-generate-code`, {
    ida,
    phone,
  });
}

export async function validatePhoneCode(ida, code) {
  return axios.post(`${process.env.AUTH_API_URI}/phone-validate-code`, {
    ida,
    code,
  });
}

export async function sendValidationEmail(ida, email) {
  return axios.post(`${process.env.AUTH_API_URI}/send-email-validation`, {
    ida,
    email,
  });
}

export async function getIDA(ida) {
  return axios.get(`${process.env.AUTH_API_URI}/user/${ida}`);
}

export async function getUser(ida) {
  return apollo.query({
    query: oneUserQuery,
    variables: {
      ida,
    },
  });
}
