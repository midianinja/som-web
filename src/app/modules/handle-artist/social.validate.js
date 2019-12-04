export default ({
  facebook, instagram,
  twitter, youtube,
}) => {
  const errors = [];

  if (!facebook) errors.push({ attribute: 'facebook' });
  if (!instagram) errors.push({ attribute: 'instagram' });
  if (!twitter) errors.push({ attribute: 'twitter' });
  if (!youtube) errors.push({ attribute: 'youtube' });

  if (errors.length) return ({ error: true, errors });
  return ({ error: false });
};
