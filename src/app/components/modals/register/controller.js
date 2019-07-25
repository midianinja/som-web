import { createIDA, createUserSOM } from './repository';

export async function createAccount({
  username, password, setError, setStep, setIDA,
}) {
  let promise;
  try {
    promise = await createIDA(username, password);
  } catch (err) {
    throw err;
  }

  const { data, error } = await promise.json();
  const dataError = {};

  if (error && error === 'auth/duplicated-user') {
    dataError.username = 'Nome de usuário já em uso';
    setError(dataError);
    return;
  }

  try {
    promise = await createUserSOM(data.ida);
  } catch (err) {
    console.log([err]);
    throw err;
  }

  setIDA(data.ida);
  setStep('methods');
}

export const ignore = null;
