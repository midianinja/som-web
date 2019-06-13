export default ({
  phone, email,
}) => {
  const errors = [];

  if (!phone) errors.push({ attribute: 'phone' });
  if (!email) errors.push({ attribute: 'email' });

  if (errors.length) return ({ error: true, errors });
  return ({ error: false });
};
