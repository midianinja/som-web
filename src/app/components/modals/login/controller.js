import { authorize, getUser, getIDA } from './repository';
import { allowBodyScroll } from '../../../utilities/scroll';

export async function login(username, password, setError, closeModal, history, dispatch, state) {
  let promise;
  try {
    promise = await authorize(username, password);
  } catch (err) {
    throw err;
  }

  const { data, error } = await promise.json();
  const dataError = {};

  if (error && error === 'user/not-found') {
    dataError.username = 'Usuário não encontrado.';
    setError(dataError);
    return;
  }

  if (error && error === 'user/wrong-password') {
    dataError.password = 'Senha errada.';
    setError(dataError);
    return;
  }

  let userIDAPromise;
  try {
    userIDAPromise = await getIDA(data.ida);
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
    userResult = await getUser(data.ida);
  } catch (err) {
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: userResult.data.oneUser,
  });

  window.localStorage.setItem('som@ida', data.ida);
  window.localStorage.setItem('som@token', data.token);

  if (!state.modalLogin) {
    history.push('/welcome');
    allowBodyScroll();
    closeModal();
  } else {
    allowBodyScroll();
  }

  dispatch({
    type: 'SET_MODAL_LOGIN',
    status: false,
  });
}

export const ignore = null;
