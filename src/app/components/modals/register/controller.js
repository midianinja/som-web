import {
  createIDA, createUserSOM, generatePhoneCode, validatePhoneCode,
  sendValidationEmail, getIDA, getUser,
} from './repository';

export async function createAccount({
  username, password, setError, setStep, setIDA, setToken,
  setLoading,
}) {
  setLoading(true);
  let promise;
  try {
    promise = await createIDA(username, password);
  } catch (err) {
    const { error } = err.response.data;
    const dataError = {};

    if (error && error === 'auth/duplicated-user') {
      dataError.username = 'Nome de usuário já em uso';
      setError(dataError);
      setLoading(false);
      return;
    }

    setLoading(false);
    throw err;
  }
  const { data } = promise.data;

  try {
    await createUserSOM(data.ida);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  setLoading(false);
  setIDA(data.ida);
  setToken(data.token);
  setStep('methods');
}

export async function generatePhoneCodeSubmit({
  phone, ida, setStep, setLoading,
}) {
  setLoading(true);
  try {
    await generatePhoneCode(ida, phone);
  } catch (error) {
    setLoading(false);
    throw error;
  }

  setLoading(false);
  setStep('sentPhone');
}

export async function validatePhoneCodeSubmit({
  ida, token, code, setError, navigationTo, closeModal,
  dispatch, setLoading,
}) {
  setLoading(true);
  try {
    await validatePhoneCode(ida, code);
  } catch (error) {
    const dataError = {};
    setError({ ...dataError, code: 'Código inválido' });
    setLoading(false);
    throw error;
  }

  window.localStorage.setItem('som@ida', ida);
  window.localStorage.setItem('som@token', token);

  let userIDAPromise;
  try {
    userIDAPromise = await getIDA(ida);
  } catch (err) {
    setLoading(false);
    throw err;
  }
  const { data } = userIDAPromise.data;
  dispatch({
    type: 'SET_AUTH',
    auth: data.user,
  });

  let userResult;
  try {
    userResult = await getUser(ida);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  dispatch({
    type: 'SET_USER',
    user: userResult.data.oneUser,
  });


  setLoading(false);
  closeModal();
  navigationTo('/welcome');
}

export async function sendConfirmationEmail({
  ida, email, setError, setStep, setLoading,
}) {
  setLoading(true);
  try {
    await sendValidationEmail(ida, email);
  } catch (err) {
    const { error } = err.response.data;
    const dataError = {};
    if (error && error === 'email/invalid-email') {
      dataError.email = 'Email inválido';
      setError(dataError);
    }

    setLoading(false);
    throw err;
  }

  setLoading(false);
  setStep('sentEmail');
}
