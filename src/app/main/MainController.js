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
    console.error('err:', [err]);
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

export const fetchLoggedUser = async (ida, dispatch, history) => {
  let response;

  try {
    response = await getUser(ida);
    console.log('response:', response);
  } catch (err) {
    console.error('err: ', { err });
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: response.data.oneUser,
  });

  let typeConnection = 'public';
  if (response.data.oneUser.productor) {
    typeConnection = 'productor';
  } else if (response.data.oneUser.artist) {
    typeConnection = 'artist';
  }

  typeConnection = window.localStorage.getItem('som@type') || 'public';
  dispatch({
    type: 'SET_LOGIN_TYPE',
    data: typeConnection,
  });

  if (history.location.pathname === '/') {
    history.push('/welcome');
  }
};
