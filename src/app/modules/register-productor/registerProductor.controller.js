import apollo from '../../apollo';
import {
  createProductor, updateProductor, createLocation, updateLocation,
} from './registerProductor.repository';
import { basicInformationIsValid } from './productor.validate';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import { allCountriesQuery, allStateQuery } from './registerProduct.queries';
import { getBase64, uploadImageToStorage } from '../../utilities/file.utils';

export const deleteTag = ({ id, tags, setTag }) => {
  const myTags = tags.filter(tag => tag.id !== id);
  setTag(myTags);
};

export const handleCountrySelect = async ({
  data, setStates, setCountry, cb,
}) => {
  const countries = await apollo.query({
    query: allStateQuery,
    variables: {
      state: {
        country: data.id,
      },
    },
  });
  const states = countries.data.allStates.map(c => ({
    label: c.name,
    short_name: c.short_name,
    id: c.id,
  }));

  if (cb) cb({ states });
  setStates(states);
  setCountry(data);
};

export const handleStateSelect = async ({ data, setState }) => {
  setState(data);
};

export const fetchLocations = async ({
  setCountries, setStates, productor, setCountry, setState,
}) => {
  const countries = await apollo.query({
    query: allCountriesQuery,
    variables: {},
  });

  const myCountries = countries.data.allCountries.map(c => ({
    label: c.name,
    short_name: c.short_name,
    id: c.id,
  }));

  if (productor.location && productor.location.country) {
    const data = myCountries.find(
      country => productor.location.country === country.short_name,
    );

    let cb = null;

    if (productor.location.state) {
      cb = ({ states }) => {
        const stateData = states.find(
          state => productor.location.state === state.short_name,
        );

        handleStateSelect({ data: stateData, setState });
      };
    }

    handleCountrySelect({
      data, setStates, setCountry, cb,
    });
  }

  setCountries(myCountries);
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

export const mapMusicalStyles = (styles) => {
  const colors = [
    'purple', 'green', 'orange',
    'magenta', 'yellow',
  ];

  if (!styles) return [];
  return styles.map(({ id, name }) => ({
    id,
    text: name,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

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

export const nextCallback = ({
  visibles, setVisibles, history, id,
}) => {
  const next = Object.entries(visibles).find(item => !item[1]);
  const newVisibles = { ...visibles };

  if (next) {
    newVisibles[next[0]] = true;
    setVisibles(newVisibles);
  } else {
    history.push(`/productor/${id}`);
    setVisibles(newVisibles);
  }
};

const mapProductorToApi = (values, userId, locationId) => ({
  user: userId,
  photo: values.avatar.url,
  name: values.name,
  description: values.about,
  cpf: values.cpf,
  cnpj: values.cnpj,
  location: locationId,
  musical_styles: values.musicalStyles.map(({ id }) => id),
  status: basicInformationIsValid(values) ? 'INCOMPLETE' : 'ACTIVE',
  main_phone: values.mainPhone,
  secondary_phone: values.secondaryPhone,
  whatsapp: values.whatsapp,
  telegram: values.telegram,
  contact_email: values.contactEmail,
  facebook: values.facebook,
  instagram: values.instagram,
  twitter: values.twitter,
  youtube: values.youtube,
});

const saveLocation = (id, values) => {
  const { city, state, country } = values;
  const location = {
    city,
    state: state.short_name,
    country: country.short_name,
  };

  if (id) {
    return updateLocation(id, location);
  }

  return createLocation(location);
};

export const handleCreateProductor = async (
  values, userId, setLoading, visibles, setId,
  setVisibles, setLocationId, dispatch, user, history,
) => {
  const productor = { ...values };
  let newImage = null;

  if (productor.avatar && productor.avatar.file) {
    try {
      setLoading({ show: true, text: 'Tratando imagen' });
      const base64 = await getBase64(productor.avatar.file);
      setLoading({ show: true, text: 'Subindo imagem' });
      newImage = await uploadImageToStorage({
        file: base64,
        id: userId,
      });
    } catch (err) {
      // try
    }

    productor.avatar = newImage.data.data.urls.mimified;
  }

  let promise;
  const data = mapProductorToApi(productor, userId);
  try {
    setLoading({ show: true, text: 'Atualizando Produtor' });
    promise = await createProductor(data);
  } catch (err) {
    console.error([err]);
    setLoading({ show: false });
    throw err;
  }
  console.log('promise.data.updateProductor.id:', promise.data.createProductor.id);
  setId(promise.data.createProductor.id);
  dispatch({
    action: 'SET_USER',
    user: { ...user, productor: promise.data.createProductor },
  });
  nextCallback({ visibles, setVisibles, history, });
  setLoading({ show: false });
};

export const handleEditProductor = async (
  values, productorId, userId, setLoading,
  visibles, setVisibles, setLocationId,
  dispatch, user, history, 
) => {
  const productor = { ...values };
  let newImage = null;

  if (productor.avatar && productor.avatar.file) {
    try {
      setLoading({ show: true, text: 'Tratando imagen' });
      const base64 = await getBase64(productor.avatar.file);
      setLoading({ show: true, text: 'Subindo imagem' });
      newImage = await uploadImageToStorage({
        file: base64,
        id: userId,
      });
    } catch (err) {
      // to be try
    }

    productor.avatar = { url: newImage.data.data.urls.mimified };
  }

  let locationId = null;
  if (productor.city || productor.country.short_name) {
    setLoading({ show: true, text: 'Salvando localização' });
    let locationResult;
    try {
      locationResult = await saveLocation(
        values.locationId, values,
      );
    } catch (err) {
      // to be try
    }

    if (values.locationId) {
      locationId = locationResult.data.updateLocation.id;
    } else {
      locationId = locationResult.data.createLocation.id;
    }
    setLocationId(locationId);
  }

  let promise;
  const data = mapProductorToApi(productor, userId, locationId);
  try {
    setLoading({ show: true, text: 'Atualizando Produtor' });
    promise = await updateProductor(productorId, data);
  } catch (err) {
    console.error([err]);
    setLoading({ show: false });
    throw err;
  }

  dispatch({
    action: 'SET_USER',
    user: { ...user, productor: promise.data.updateProductor },
  });
  nextCallback({
    visibles, setVisibles, history, id: productorId,
  });
  setLoading({ show: false });
};
