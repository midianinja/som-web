import { authorize } from './repository';
import { allowBodyScroll } from '../../../utilities/scroll';

export async function login(username, password, setError, closeModal, history) {
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

  window.localStorage.setItem('som@ida', data.ida);
  window.localStorage.setItem('som@token', data.token);

  allowBodyScroll();
  closeModal();
  history.push('/welcome');
}

export const ignore = null;
