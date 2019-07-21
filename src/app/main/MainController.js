import { verifyAuth } from '../utilities/auth.utils';
import { getUser } from './MainRepository';

export const verify = async (dispatch, setIDA) => {
  const ida = window.localStorage.getItem('som@ida');
  const token = window.localStorage.getItem('som@token');

  if (!ida || !token) {
    window.localStorage.setItem('som@ida', '');
    window.localStorage.setItem('som@token', '');
  }

  let verified;

  try {
    verified = await verifyAuth(token);
  } catch (err) {
    dispatch({ type: 'STOP_VERIFY_LOADING' });
    throw err;
  }

  if (verified && verified.data.ida) {
    setIDA(verified.data.ida);
    dispatch({
      type: 'SET_AUTH',
      auth: {
        ida: verified.data.ida,
        username: verified.data.username,
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
  } catch (err) {
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: response.data.oneUser,
  });
  console.log(response);
};
