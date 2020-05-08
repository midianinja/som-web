import axios from 'axios';
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
  return axios.post(
    `${process.env.AUTH_API_URI}/login`,
    { username, password },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function getIDA(ida) {
  return axios.get(`${process.env.AUTH_API_URI}/user/${ida}`);
}

export const ignore = null;
