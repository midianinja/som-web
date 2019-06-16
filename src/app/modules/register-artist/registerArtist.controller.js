import apollo from '../../apollo';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import validateArtist from './artist.validate';
import validateContact from './contact.validate';
import validateSocialMedia from './social.validate';
import { createArtistMutation, upadteArtistMutation } from '../../mutations/artist.mutation';

// const setArtist = (values) => {

// }

const validateArtistForm = ({
  avatar, name, integrants, about,
  country, state, city, musicalStyles,
  musicalStylePredict, musicalStyle,
  phone, email, facebook, instagram,
  twitter, youtube,
}) => {
  const errors = [];
  const vArtist = validateArtist({
    avatar, name, integrants, about,
    country, state, city, musicalStyles,
    musicalStylePredict, musicalStyle,
  });
  console.log('vArtist: ', vArtist);
  if (vArtist.error) {
    errors.concat(vArtist.errors);
  }

  const vContact = validateContact({
    phone, email,
  });
  console.log('vContact: ', vContact);
  if (vContact.error) {
    errors.concat(vContact.errors);
  }

  const vSocial = validateSocialMedia({
    facebook, instagram,
    twitter, youtube,
  });
  console.log('vSocial: ', vSocial);
  if (vSocial.error) {
    errors.concat(vSocial.errors);
  }

  console.log('errors: ', errors);
  if (errors.length) return ({ error: true, errors });
  return ({ error: false });
};

const mapArtist = artist => ({
  name: artist.name,
  members_number: parseInt(artist.integrants, 10),
  avatar_image: artist.avatar.url,
  about: artist.about,
  country: '',
  state: '',
  city: artist.city,
  musical_styles: artist.musicalStyles.map(m => m.id),
});

const createArtist = async (artist) => {
  const artistToApi = mapArtist(artist);
  const artistPromise = await apollo.mutate({
    mutation: createArtistMutation,
    variables: {
      artist: artistToApi,
    },
  });
  return artistPromise.data.createArtist;
};
const updateArtist = async (artist, id) => {
  console.log('updateArtist - artist: ', artist);
  console.log('updateArtist - id: ', id);
  const artistToApi = mapArtist(artist);
  const artistPromise = await apollo.mutate({
    mutation: upadteArtistMutation,
    variables: {
      artist_id: id,
      artist: artistToApi,
    },
  });
  return artistPromise.data.updateArtist;
};

export const nextAction = async ({
  about, city, integrants, id,
  country, state, name, setId,
  avatar, musicalStyles,
  musicalStylePredict, musicalStyle,
  visibles, setVisibles, setArtistStepErrors,
  phone, email, facebook, instagram,
  twitter, youtube,
}) => {
  const artistValidation = validateArtistForm({
    avatar, name, integrants, about,
    country, state, city, musicalStyles,
    musicalStylePredict, musicalStyle, setVisibles,
    setArtistStepErrors, visibles, facebook, instagram,
    twitter, youtube, phone, email,
  });
  console.log('artistValidation: ', artistValidation);
  if (artistValidation.error) return null;
  const artistToApi = {
    about, city, integrants,
    country, state, name,
    avatar, musicalStyles, setId,
  };

  if (!id) {
    const artistResponse = await createArtist(artistToApi);
    setId(artistResponse.id);
    return artistValidation;
  }
  updateArtist(artistToApi, id);
  return null;
};

export const skipAction = (e) => {
  console.log('skipAction: ', e);
};


export const handleACMusicalStyle = ({
  value, musicalStylesOptions, setMusicalStylePredict, setMusicalStyle,
}) => {
  let match = '';
  const regex = new RegExp(`^${value.toUpperCase()}`);
  musicalStylesOptions.forEach((style) => {
    const isMatch = regex.test(style.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    if (isMatch && !match && value) {
      match = style.name.toLowerCase();
    }
  });
  setMusicalStylePredict(match);
  setMusicalStyle(value.toLowerCase());
};

export const steps = [
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
];

export const handleMusicalStyleSelect = ({
  value, musicalStylesOptions, musicalStyles, setMusicalStyle,
  setMusicalStylePredict, setMusicalStyles,
}) => {
  setMusicalStyle(value);
  const colors = [
    'purple',
    'green',
    'orange',
    'magenta',
    'yellow',
  ];
  const style = musicalStylesOptions.filter(o => (o.name.toLowerCase() === value))[0];
  const newMusicalStyles = musicalStyles.filter(o => (o.text.toLowerCase() !== value));
  setMusicalStyle('');
  setMusicalStylePredict('');
  setMusicalStyles([
    ...newMusicalStyles,
    {
      id: style.id,
      text: style.name,
      color: colors[Math.floor(Math.random() * 5)],
    }]);
};

export const fetchMusicalStyleOptions = (setMusicalStylesOptions) => {
  apollo.query({
    query: allMusicalStyleOptionsQuery,
    variables: {},
  }).then(resp => setMusicalStylesOptions(resp.data.allMusicalStyleOptions));
};
