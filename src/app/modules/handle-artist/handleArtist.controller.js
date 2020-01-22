import apollo from '../../apollo';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import { createArtistMutation, upadteArtistMutation } from '../../mutations/artist.mutation';
import { getBase64, uploadPdfDocumentToStorage, uploadImageToStorage } from '../../utilities/file.utils';
import { validateArtistForm } from './handleArtist.validate';
import { createSongMutation } from './songs.mutation';
import { allCountriesQuery, allStateQuery } from './handleArtist.queries';
import {
  validateDescription, validateEmail, validateNumber,
  validatePhoneString, validateInstagramUrl, validateCommonString,
  validateYoutubeUrl, validateFacebookUrl, validateTwitterUrl,
} from '../../utilities/rgxValidator.utils';

const colors = [
  'purple',
  'green',
  'orange',
  'magenta',
  'yellow',
];

const mapArtist = (artist, user) => ({
  user,
  name: artist.name,
  country: artist.country,
  state: artist.state,
  members_number: parseInt(artist.integrants, 10),
  avatar_image: artist.avatar,
  about: artist.about,
  songs: artist.songs,
  city: artist.city,
  musical_styles: artist.musicalStyles.map(m => m.id),
  phone: artist.phone,
  email: artist.email,
  facebook: artist.facebook,
  instagram: artist.instagram,
  twitter: artist.twitter,
  youtube: artist.youtube,
  spotify_artist_link: artist.spotify_artist_link,
});

export const handleBlurChange = ({ target }, type, setErrors, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = {};
  switch (type) {
    case 'common':
      validated[target.id] = validateCommonString(target.value);
      break;
    case 'number':
      validated[target.id] = validateNumber(target.value);
      break;
    case 'description':
      validated[target.id] = validateDescription(target.value);
      break;
    case 'phone':
      validated[target.id] = validatePhoneString(target.value);
      break;
    case 'email':
      validated[target.id] = validateEmail(target.value);
      break;
    case 'facebookUrl':
      validated[target.id] = validateFacebookUrl(target.value);
      break;
    case 'instagramUrl':
      validated[target.id] = validateInstagramUrl(target.value);
      break;
    case 'twitterUrl':
      validated[target.id] = validateTwitterUrl(target.value);
      break;
    case 'youtubeUrl':
      validated[target.id] = validateYoutubeUrl(target.value);
      break;
    default:
      return;
  }

  if (!validated[target.id]) {
    errors[target.id] = 'Campo inválido';
    setErrors(errors);
  } else {
    errors[target.id] = '';
    setErrors(errors);
  }
};

export const deleteTag = ({ id, musicalStyles }) => {
  const myTags = musicalStyles.value.filter(tag => tag.id !== id);
  musicalStyles.update(myTags);
};

export const handleStateSelect = async ({ data, state }) => {
  state.state.update(data);
};

export const handleCountrySelect = async ({ data, state, myState }) => {
  const states = await apollo.query({
    query: allStateQuery,
    variables: {
      state: {
        country: data.id,
      },
    },
  });
  const myStates = states.data.allStates.map(c => ({
    label: c.name,
    id: c.id,
  }));
  state.country.update(data);
  state.states.update(myStates);
  const [mySelectedState] = myStates.filter(stt => stt.label === myState);
  handleStateSelect({ data: mySelectedState, state });
};

export const fetchLocations = async ({ state }) => {
  const countries = await apollo.query({
    query: allCountriesQuery,
    variables: {},
  });
  const myCountrires = countries.data.allCountries.map(c => ({
    label: c.name,
    id: c.id,
  }));
  state.countries.update(myCountrires);
};

export const uploadDocumentFile = async ({ target }, id, artist) => {
  try {
    const file = target.files[0];
    const pdfBase64 = await getBase64(file);
    const name = `${new Date().getTime()}_${id}.pdf`;

    const uploadedFile = await uploadPdfDocumentToStorage({
      file: pdfBase64,
      id: artist || 'salve',
      fileName: name,
    });
    let doc;
    const artistToApi = {};

    switch (id) {
      case 'mapa': doc = 'stage_map'; break;
      case 'rider': doc = 'tec_rider'; break;
      case 'kit': doc = 'kit'; break;
      default: throw new Error('ID is not mapped.');
    }

    artistToApi[doc] = uploadedFile.data.data.link;

    await apollo.mutate({
      mutation: upadteArtistMutation,
      variables: {
        artist_id: artist,
        artist: artistToApi,
      },
    });
  } catch (err) {
    throw err;
  }
};

const createArtist = async (artist, userId) => {
  const artistToApi = mapArtist(artist, userId);
  const artistPromise = await apollo.mutate({
    mutation: createArtistMutation,
    variables: {
      artist: artistToApi,
    },
  });
  return artistPromise.data.createArtist;
};

const updateArtist = async (artist, id) => {
  const artistToApi = mapArtist(artist);
  const updatedPromise = await apollo.mutate({
    mutation: upadteArtistMutation,
    variables: {
      artist_id: id,
      artist: artistToApi,
    },
  });
  return updatedPromise.data.updateArtist;
};

const mapSong = (song, artist) => ({
  artist,
  url: song.url,
  title: song.title,
});

export const mapArtistToState = (artist, state) => {
  if (!artist) {
    return ({
      country: {},
      state: {},
      avatar: {},
      musicalStyles: [],
    });
  }
  let country = {};
  if (state && !state.country.value.label && state.countries.value.length) {
    [country] = state.countries.value.filter(ctry => (artist.country === ctry.label));
    handleCountrySelect({ data: country, state, myState: artist.state });
  }
  return ({
    about: artist.about,
    phone: artist.phone,
    city: artist.city,
    integrants: artist.members_number,
    country,
    state: { label: artist.state, id: artist.state },
    name: artist.name,
    avatar: {
      url: artist.avatar_image ? artist.avatar_image.mimified : '',
      urls: artist.avatar_image,
    },
    musicalStyles: artist.musical_styles ? artist.musical_styles.map(styl => ({
      id: styl.id,
      text: styl.name,
      color: colors[Math.floor(Math.random() * 5)],
    })) : [],
    email: artist.email,
    facebook: artist.facebook,
    instagram: artist.instagram,
    twitter: artist.twitter,
    spotify: artist.spotify_id,
    youtube: artist.youtube,
    // songs
  });
};

const createSong = async (song, artist) => {
  const songToApi = mapSong(song, artist);
  const songPromise = await apollo.mutate({
    mutation: createSongMutation,
    variables: {
      song: songToApi,
    },
  });
  return songPromise.data.createSong;
};

const mapToValidate = state => ({
  avatar: state.avatar.value,
  name: state.name.value,
  integrants: state.integrants.value,
  about: state.about.value,
  country: state.country.value,
  state: state.state.value,
  city: state.city.value,
  musicalStyles: state.musicalStyles.value,
  musicalStylePredict: state.musicalStylePredict.value,
  musicalStyle: state.musicalStyle.value,
  visibles: state.visibles.value,
  facebook: state.facebook.value,
  instagram: state.instagram.value,
  twitter: state.twitter.value,
  youtube: state.youtube.value,
  phone: state.phone.value,
  email: state.email.value,
  songs: state.songs.value,
  spotify: state.spotify.value,
});

const mapArtistToApi = state => ({
  about: state.about.value,
  city: state.city.value,
  integrants: state.integrants.value,
  name: state.name.value,
  musicalStyles: state.musicalStyles.value,
  phone: state.phone.value,
  email: state.email.value,
  facebook: state.facebook.value,
  instagram: state.instagram.value,
  twitter: state.twitter.value,
  youtube: state.youtube.value,
  spotify_artist_link: state.spotify.value,
  country: state.country.value.label,
  state: state.state.value.label,
  songs: state.songs.value.map(s => s.id).filter(e => e),
});

export const nextAction = async ({
  state, history, store,
}) => {
  state.loading.update(true);
  // VALIDATION
  const artistToValidate = mapToValidate(state);
  const artistValidation = validateArtistForm(artistToValidate);
  if (artistValidation.error) {
    const errors = {};
    artistValidation.errors.forEach((e) => {
      errors[e.attribute] = 'Valor inválido ou campo obrigatório';
    });
    state.artistStepErrors.update(errors);
    state.loading.update(false);
    return;
  }

  try {
    let artistToApi = mapArtistToApi(state);
    console.log('state:', state);
    let preRegister = state.artist.value;
    if (!preRegister) preRegister = await createArtist(artistToApi, store.state.user.id);

    if (!state.avatar.value.urls && state.avatar.value && state.avatar.value.file) {
      const base64 = await getBase64(state.avatar.value.file);
      const newImage = await uploadImageToStorage({
        file: base64,
        id: preRegister.id,
      });
      const images = newImage.data.data.urls;
      artistToApi.avatar = images;
    } else {
      artistToApi.avatar = undefined;
      artistToApi = JSON.parse(JSON.stringify(artistToApi));
    }

    if (state.songs.value.length) {
      const songsToUpload = state.songs.value.filter(s => !(s.id));
      const promises = songsToUpload.map(song => new Promise((res, rej) => {
        createSong(song, preRegister.id)
          .then(data => res(data))
          .catch(err => rej(err));
      }));
      const uploadedSongs = await Promise.all(promises);
      artistToApi.songs = uploadedSongs.concat(state.songs.value).map(s => s.id).filter(n => n);
    }
    const updatedArtist = await updateArtist(artistToApi, preRegister.id);
    if (
      state.visibles.value.artist
      && state.visibles.value.contact
      && state.visibles.value.social
      && state.visibles.value.files
    ) {
      history.push(`/artist/${preRegister.id}`);
    }
    state.artist.update(updatedArtist);
    state.songs.update(updatedArtist.songs || []);
    state.avatar.update({
      ...state.avatar.value,
      urls: updatedArtist.avatar_image,
    });
    state.visibles.update({
      artist: true,
      contact: state.visibles.value.artist,
      social: state.visibles.value.contact,
      files: state.visibles.value.social,
    });
    state.loading.update(false);
  } catch (err) {
    state.loading.update(false);
    throw err;
  }
};

export const skipAction = (setVisibles, visibles) => setVisibles({
  artist: true,
  contact: visibles.artist,
  social: visibles.contact,
  files: visibles.social,
});


export const handleACMusicalStyle = ({ value, state }) => {
  let match = '';
  const regex = new RegExp(`^${value.toUpperCase()}`);
  state.musicalStylesOptions.value.forEach((style) => {
    const isMatch = regex.test(style.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    if (isMatch && !match && value) {
      match = style.name.toLowerCase();
    }
  });

  state.musicalStylePredict.update(match);
  state.musicalStyle.update(value.toLowerCase());
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

export const handleMusicalStyleSelect = ({ value, state }) => {
  const myValue = value.value.label;
  state.musicalStyle.update(value);
  const style = state.musicalStylesOptions.value.find(
    o => (o.name.toLowerCase() === myValue.toLowerCase()),
  );
  const newMusicalStyles = state.musicalStyles.value
    .filter(o => (o.text.toLowerCase() !== myValue))
    .concat([
      {
        id: style.id,
        text: style.name,
        color: colors[Math.floor(Math.random() * 5)],
      },
    ]);

  let cont = 0;

  const stylesWithColor = newMusicalStyles.map((s) => {
    const stl = ({
      ...s,
      color: colors[cont],
    });

    if (cont >= 4) cont = -1;
    cont += 1;
    return stl;
  });

  state.musicalStyle.update('');
  state.musicalStylePredict.update('');
  state.musicalStyles.update(stylesWithColor);
};

export const fetchMusicalStyleOptions = (setMusicalStylesOptions) => {
  apollo.query({
    query: allMusicalStyleOptionsQuery,
    variables: {},
  }).then(resp => setMusicalStylesOptions(resp.data.allMusicalStyleOptions));
};
