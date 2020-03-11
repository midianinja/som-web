import {
  transparent, secondaryRed, secondaryYellow, terciaryGreen,
} from '../../../settings/colors';


export function phoneMask(input) {
  let v = input;
  v = v.replace(/\D/g, '');
  v = v.length > 11 ? v.substring(0, 11) : v;
  v = v.replace(/^(\d\d)(\d)/g, '($1) $2');
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  return v;
}

export function isPhone(input) {
  const inputWithoutChars = input.replace(/\W/g, '');
  const inputPhoneFormatted = `+55${inputWithoutChars}`;
  const regexPhone = /^\+[0-9]{9,}$/;
  return regexPhone.test(inputPhoneFormatted);
}

export function isEmail(input) {
  const regexW3C = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regexW3C.test(input);
}

export default function inputValidation(input) {
  // regex extract from W3C for email patterns
  // const regexW3C = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]
  // +@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9]
  // (?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validation = (!isEmail(input) && !isPhone(input)) ? 'Formato de email ou telefone inválido' : '';
  return validation;
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

export function getPasswordPointMessage(point) {
  let message = '';
  if (point <= 0) message = '';
  if (point < 60) message = 'Senha fraca';
  if (point < 90) message = 'Senha razoável';
  if (point >= 90) message = 'Senha forte';

  return message;
}

export function getPasswordPointColor(point) {
  if (point <= 0) return transparent;
  if (point < 60) return secondaryRed;
  if (point < 90) return secondaryYellow;
  return terciaryGreen;
}

export function passwordValidation(password) {
  return getPasswordPoint(password) >= 60;
}
