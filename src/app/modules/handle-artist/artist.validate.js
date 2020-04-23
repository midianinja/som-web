export default ({
  avatar, name, integrants,
  about, country, state,
  city, musicalStyles,
}) => {
  const errors = [];

  if (!avatar.url) errors.push({ attribute: 'avatar' });
  if (!musicalStyles || !musicalStyles.length) errors.push({ attribute: 'musicalStyles' });
  if (!city) errors.push({ attribute: 'city' });
  if (!state) errors.push({ attribute: 'state' });
  if (!country) errors.push({ attribute: 'country' });
  if (!about || !about.length) errors.push({ attribute: 'about' });
  if (!parseInt(integrants, 10) || parseInt(integrants, 10) < 1) errors.push({ attribute: 'integrants' });
  if (!name) errors.push({ attribute: 'name' });

  if (errors.length) return ({ error: true, errors });
  return ({ error: false });
};
