import {
  createIDA, createUserSOM, generatePhoneCode, validatePhoneCode,
  sendValidationEmail,
} from './repository';

export async function createAccount({
  username, password, setError, setStep, setIDA, setToken,
}) {
  let promise;
  try {
    promise = await createIDA(username, password);
  } catch (error) {
    throw error;
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
  setToken(data.token);
  setStep('methods');
}

export async function generatePhoneCodeSubmit({
  phone, ida, setStep,
}) {
  try {
    await generatePhoneCode(ida, phone);
  } catch (error) {
    throw error;
  }

  setStep('sentPhone');
}

export async function validatePhoneCodeSubmit({
  ida, token, code, setError, navigationTo, closeModal,
}) {
  let promise;

  try {
    promise = await validatePhoneCode(ida, code);
  } catch (error) {
    throw error;
  }

  const { error } = await promise.json();
  if (error) {
    const dataError = {};
    setError({ ...dataError, code: 'Código inválido' });
  } else {
    window.localStorage.setItem('som@ida', ida);
    window.localStorage.setItem('som@token', token);

    closeModal();
    navigationTo('/welcome');
  }
}

export async function sendConfirmationEmail({
  ida, email, setError, setStep,
}) {
  let promise;
  try {
    promise = await sendValidationEmail(ida, email);
  } catch (err) {
    throw err;
  }

  const { error } = await promise.json();
  const dataError = {};
  if (error && error === 'email/invalid-email') {
    dataError.email = 'Email inválido';
    setError(dataError);
    return;
  }

  setStep('sentEmail');
}
