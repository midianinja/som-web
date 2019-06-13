import apollo from '../../apollo';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import validateArtist from './artist.validate';
import validateContact from './contact.validate';

// const setArtist = (values) => {

// }

const validateArtistForm = ({
  avatar, name, integrants, about,
  country, state, city, musicalStyles,
  musicalStylePredict, musicalStyle,
  setVisibles, setArtistStepErrors,
  visibles,
}) => {
  const validate = validateArtist({
    avatar, name, integrants, about,
    country, state, city, musicalStyles,
    musicalStylePredict, musicalStyle,
  });

  if (validate.error) {
    const errors = {};
    validate.errors.forEach((e) => {
      errors[e.attribute] = 'Valor inválido ou campo obrigatório';
    });
    return setArtistStepErrors(errors);
  }
  return setVisibles({ ...visibles, contact: true });
};

const validateContactForm = ({
  phone, email, setContactStepErrors,
  visibles, setVisibles,
}) => {
  const validate = validateContact({
    phone, email,
  });

  if (validate.error) {
    const errors = {};
    validate.errors.forEach((e) => {
      errors[e.attribute] = 'Valor inválido ou campo obrigatório';
    });
    return setContactStepErrors(errors);
  }
  return setVisibles({ ...visibles, social: true });
};

export const nextAction = ({
  about, city, integrants,
  country, state, name,
  avatar, musicalStyles,
  musicalStylePredict, musicalStyle,
  visibles, setVisibles, setArtistStepErrors,
  phone, email, facebook, instagram,
  twitter, youtube,
  setContactStepErrors,
}) => {
  if (!visibles.contact) {
    return validateArtistForm({
      avatar, name, integrants, about,
      country, state, city, musicalStyles,
      musicalStylePredict, musicalStyle, setVisibles,
      setArtistStepErrors, visibles,
    });
  }
  if (!visibles.social) {
    validateArtistForm({
      avatar, name, integrants, about,
      country, state, city, musicalStyles,
      musicalStylePredict, musicalStyle, setVisibles: () => '',
      setArtistStepErrors, visibles,
    });
    return validateContactForm({
      phone, email, setContactStepErrors,
      visibles, setVisibles,
    });
  }
  // if (!visibles.files) validateAbout();

  return;
  // console.log('twitter, youtube, visibles, setVisibles,: ', twitter, youtube, visibles, setVisibles,);
  // console.log('email, facebook, instagram,: ', email, facebook, instagram,);
  // console.log('musicalStylePredict, musicalStyle, phone,: ', musicalStylePredict, musicalStyle, phone,);
  // console.log('avatar, musicalStyles, musicalStylesOptions,: ', avatar, musicalStyles, musicalStylesOptions,);
  // console.log('country, state, name,: ', country, state, name,);
  // console.log('about, city, integrants,: ', about, city, integrants,);
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
}
