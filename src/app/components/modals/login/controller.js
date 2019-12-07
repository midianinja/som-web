import { authorize, getUser, getIDA } from './repository';
import { allowBodyScroll } from '../../../utilities/scroll';

export async function login(
  username, password, setError, closeModal,
  history, dispatch, state, setLoading,
) {
  setLoading(true);
  let promise;
  try {
    promise = await authorize(username, password);
  } catch (err) {
    console.log('err:', err);
    const { error } = err.response.data;
    const dataError = {};

    if (error && error === 'user/not-found') {
      dataError.username = 'Usuário não encontrado.';
      setError(dataError);
      setLoading(false);
    }

    if (error && error === 'user/wrong-password') {
      dataError.password = 'Senha errada.';
      setError(dataError);
      setLoading(false);
    }

    throw err;
  }

  const { data } = promise.data;
  let userIDAPromise;
  try {
    userIDAPromise = await getIDA(data.ida);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  const userIDAResult = userIDAPromise.data;

  dispatch({
    type: 'SET_AUTH',
    auth: userIDAResult.data.user,
  });

  let userResult;
  try {
    userResult = await getUser(data.ida);
    console.log('userResult:', userResult);
  } catch (err) {
    setLoading(false);
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

  setLoading(false);
  dispatch({
    type: 'SET_MODAL_LOGIN',
    status: false,
  });
}

export const ignore = null;
