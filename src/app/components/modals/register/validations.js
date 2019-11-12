export function usernameValidation(username) {
  const regex = /^[_a-zA-Z0-9]{1,}$/;
  return regex.test(username);
}

export function phoneValidation(phone) {
  const regex = /^\+55[0-9]{11}$/;
  return regex.test(phone);
}

export function emailValidation(email) {
  const regex = /^[a-z0-9._-]{2,}@[a-z0-9]{2,}\.[a-z]{2,}(\.[a-z]{2})?$/;
  return regex.test(email);
}

export function getPasswordPoint(password) {
  let points = 0;
  if (password.length > 5) points += 50;

  let regex = /[A-Z]/;
  if (regex.test(password)) points += 10;

  regex = /[a-z]/;
  if (regex.test(password)) points += 10;

  regex = /[0-9]/;
  if (regex.test(password)) points += 10;

  regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  if (regex.test(password)) points += 20;

  return points;
}

export function passwordValidation(password) {
  return getPasswordPoint(password) >= 60;
}
