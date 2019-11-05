import { createIDA, createUserSOM } from './repository';

export async function createAccount({
  username, password, setError, setStep, setIDA,
}) {
  let promise;
  try {
    promise = await createIDA(username, password);
  } catch (error) {
    throw error;
  }

  const { data, error } = await promise.json();
  const dataError = {};
  console.log(error);
  if (error && error === 'auth/duplicated-user') {
    dataError.username = 'Nome de usuário já em uso';
    setError(dataError);
    return;
  }

  try {
    promise = await createUserSOM(data.ida);
  } catch (err) {
    throw err;
  }

  setIDA(data.ida);
  setStep('methods');
}

export const ignore = null;
