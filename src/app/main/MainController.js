import { verifyAuth } from '../utilities/auth.utils';
import { getUser } from './MainRepository';

export const verify = async (dispatch, setIDA) => {
  const ida = window.localStorage.getItem('som@ida');
  console.log('ida: ', ida);
  const token = window.localStorage.getItem('som@token');
  console.log('token: ', token);

  if (!ida || !token) {
    window.localStorage.setItem('som@ida', '');
    window.localStorage.setItem('som@token', '');
  }

  let verified;

  try {
    verified = await verifyAuth(token);
    console.log('verified: ', verified);
  } catch (err) {
    dispatch({ type: 'STOP_VERIFY_LOADING' });
    throw err;
  }

  if (verified && verified.ida) {
    setIDA(verified.ida);
    dispatch({
      type: 'SET_AUTH',
      auth: {
        ida: verified.ida,
        username: verified.username,
      },
    });
  } else {
    window.localStorage.setItem('som@ida', '');
    window.localStorage.setItem('som@token', '');
  }

  dispatch({ type: 'STOP_VERIFY_LOADING' });
};

export const fetchLoggedUser = async (ida, dispatch) => {
  let response;

  try {
    response = await getUser(ida);
    console.log('response: ', response);
  } catch (err) {
    console.log('err: ', {err});
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: response.data.oneUser,
  });
};
