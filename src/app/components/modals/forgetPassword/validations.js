export default function emailValidation(email) {
  // regex extract from W3C for email patterns
  const regexW3C = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validation = regexW3C.test(email) ? '' : 'Email com formato inválido';
  return validation;
}
