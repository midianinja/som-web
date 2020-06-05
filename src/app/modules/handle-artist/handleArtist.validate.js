import validateArtistFunction from './artist.validate';
import validateContactFunction from './contact.validate';
import validateSocialMediaFunction from './social.validate';

export const validateArtist = validateArtistFunction;
export const validateContact = validateContactFunction;
export const validateSocialMedia = validateSocialMediaFunction;

export const validateArtistForm = ({
  avatar, name, integrants, about,
  country, state, city, musicalStyles,
  musicalStylePredict, musicalStyle,
  phone, email, facebook, instagram,
  twitter, youtube, visibles,
}) => {
  let errors = [];
  const sectionErrors = {};

  const vArtist = validateArtist({
    avatar, name, integrants, about,
    country, state, city, musicalStyles,
    musicalStylePredict, musicalStyle,
  });
  if (visibles.artist && vArtist.error) {
    sectionErrors.artist = true;
    errors = errors.concat(vArtist.errors);
  }

  const vContact = validateContact({
    phone, email,
  });
  if (visibles.contact && vContact.error) {
    sectionErrors.contact = true;
    errors = errors.concat(vContact.errors);
  }

  const vSocial = validateSocialMedia({
    facebook, instagram,
    twitter, youtube,
  });
  if (visibles.social && vSocial.error) {
    sectionErrors.social = true;
    errors = errors.concat(vSocial.errors);
  }

  if (errors.length) return ({ sectionErrors, error: true, errors });
  return ({ sectionErrors, error: false });
};
