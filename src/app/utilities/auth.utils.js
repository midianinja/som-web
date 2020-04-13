import axios from 'axios';

export const verifyAuth = async (token) => {
  let verification;
  try {
    verification = await axios.post(
      `${process.env.AUTH_API_URI}/validate-token`,
      { token },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    window.localStorage.setItem('som@ida', '');
    window.localStorage.setItem('som@token', '');
    return err.response.error;
  }

  return verification.data;
};

export default verifyAuth;
