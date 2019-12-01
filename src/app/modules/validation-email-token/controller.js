import { getUser, getIDA } from './repository';

export async function fetch(ida, history, dispatch) {
  let userIDAPromise;
  try {
    userIDAPromise = await getIDA(ida);
  } catch (err) {
    throw err;
  }

  const userIDAResult = await userIDAPromise.json();
  if (userIDAPromise.error) throw userIDAPromise.error;

  dispatch({
    type: 'SET_AUTH',
    auth: userIDAResult.data.user,
  });

  let userResult;
  try {
    userResult = await getUser(ida);
  } catch (err) {
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: userResult.data.oneUser,
  });

  history.push('/welcome');
}

export const ignore = null;
