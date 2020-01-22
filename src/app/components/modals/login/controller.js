import { authorize, getUser, getIDA } from './repository';
import { allowBodyScroll } from '../../../utilities/scroll';

export async function login(
  username, password, setError, closeModal,
  history, dispatch, state, setLoading,
) {
  try {
    setLoading(true);
    let promise;
    try {
      promise = await authorize(username, password);
      if (!promise) throw new Error(promise);
    } catch (err) {
      const dataError = {};
      if (err.response) {
        const { error } = err.response.data;
        const obj = {
          'user/not-found': () => { dataError.username = 'Usuário não encontrado.'; },
          'user/wrong-password': () => { dataError.password = 'Senha errada.'; },
        };
        const errorAction = obj[error];
        if (!errorAction) dataError.username = 'Erro inesperado.';
      } else {
        dataError.username = 'Erro inesperado.';
        dataError.password = 'Erro inesperado.';
      }
      setError(dataError);
      throw err;
    }

    const { data } = promise.data;
    let userIDAPromise;
    try {
      userIDAPromise = await getIDA(data.ida);
    } catch (err) {
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

    setLoading(false);
    dispatch({
      type: 'SET_MODAL_LOGIN',
      status: false,
    });
  } catch (err) {
    setLoading(false);
    throw err;
  }
}

export const ignore = null;
