import apollo from '../../apollo';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import { createArtistMutation, upadteArtistMutation } from '../../mutations/artist.mutation';
import { getBase64, uploadImageToStorage, uploadPdfDocumentToStorage } from '../../utilities/file.utils';
import { validateArtistForm } from './registerArtist.validate';
import { createSongMutation } from './songs.mutation';
import { allCountriesQuery } from './registerArtist.queries';

const mapArtist = (artist, user) => ({
  user,
  name: artist.name,
  members_number: parseInt(artist.integrants, 10),
  avatar_image: artist.avatar,
  about: artist.about,
  country: '',
  state: '',
  songs: artist.songs,
  city: artist.city,
  musical_styles: artist.musicalStyles.map(m => m.id),
  phone: artist.phone,
  email: artist.email,
  facebook: artist.facebook,
  instagram: artist.instagram,
  twitter: artist.twitter,
  youtube: artist.youtube,
});

export const fetchLocations = async ({ setCountries, setStates }) => {
  const countries = await apollo.query({
    query: allCountriesQuery,
    variables: {},
  });
  const myCountrires = countries.data.allCountries.map(c => ({
    label: c.name,
    id: c.id,
  }));
  setCountries(myCountrires);
  setStates([123]);
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

    artistToApi[doc] = uploadedFile.data.link;

    const updatedPromise = await apollo.mutate({
      mutation: upadteArtistMutation,
      variables: {
        artist_id: artist,
        artist: artistToApi,
      },
    });
    console.log('updatedPromise.data: ', updatedPromise.data);
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

export const nextAction = async ({
  about, city, integrants, id,
  country, state, name, setId,
  avatar, musicalStyles,
  musicalStylePredict, musicalStyle,
  visibles, setVisibles, setArtistStepErrors,
  phone, email, facebook, instagram, history,
  twitter, youtube, songs, setSongs, store,
}) => {
  const artistValidation = validateArtistForm({
    avatar, name, integrants, about,
    country, state, city, musicalStyles,
    musicalStylePredict, musicalStyle, setVisibles,
    setArtistStepErrors, visibles, facebook, instagram,
    twitter, youtube, phone, email, songs,
  });

  if (artistValidation.error) {
    const errors = {};
    artistValidation.errors.forEach((e) => {
      errors[e.attribute] = 'Valor inválido ou campo obrigatório';
    });
    setArtistStepErrors(errors);
    return;
  }

  const artistToApi = {
    about, city, integrants,
    country, state, name,
    musicalStyles,
    phone, email, facebook,
    instagram, twitter, youtube,
    songs: songs.map(s => s.id).filter(e => e),
  };

  console.log('user', store.state.user.id);

  try {
    let preRegister = {};
    if (!id) preRegister = await createArtist(artistToApi, store.state.user.id);

    const base64 = await getBase64(avatar.file);
    const newImage = await uploadImageToStorage({
      file: base64,
      id: id || preRegister.id,
    });
    const images = newImage.data.urls;
    artistToApi.avatar = images;

    if (songs.length) {
      const songsToUpload = songs.filter(s => !(s.id));
      const promises = songsToUpload.map(song => new Promise((res, rej) => {
        createSong(song, id || preRegister.id)
          .then(data => res(data))
          .catch(err => rej(err));
      }));
      const uploadedSongs = await Promise.all(promises);
      artistToApi.songs = uploadedSongs.concat(songs).map(s => s.id).filter(n => n);
    }

    const updatedArtist = await updateArtist(artistToApi, id || preRegister.id);
    if (visibles.artist && visibles.contact && visibles.social && visibles.files) {
      console.log('history: ', history);
      history.push(`/artist/${id || preRegister.id}`);
    }
    setSongs(updatedArtist.songs || []);
    setId(preRegister.id || id);
    setVisibles({
      artist: true,
      contact: visibles.artist,
      social: visibles.contact,
      files: visibles.social,
    });
  } catch (err) {
    throw err;
  }
};

export const skipAction = (setVisibles, visibles) => setVisibles({
  artist: true,
  contact: visibles.artist,
  social: visibles.contact,
  files: visibles.social,
});


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
  const newMusicalStyles = musicalStyles.filter(o => (o.text.toLowerCase() !== value)).concat([
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

  setMusicalStyle('');
  setMusicalStylePredict('');
  setMusicalStyles(stylesWithColor);
};

export const fetchMusicalStyleOptions = (setMusicalStylesOptions) => {
  apollo.query({
    query: allMusicalStyleOptionsQuery,
    variables: {},
  }).then(resp => setMusicalStylesOptions(resp.data.allMusicalStyleOptions));
};
