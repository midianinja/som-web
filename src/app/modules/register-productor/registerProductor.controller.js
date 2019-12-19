import apollo from '../../apollo';
import { createProductor, updateProductor } from './registerProductor.repository';
import { basicInformationIsValid } from './productor.validate';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import { allCountriesQuery, allStateQuery } from './registerProduct.queries';
import { getBase64, uploadImageToStorage } from '../../utilities/file.utils';

export const deleteTag = ({ id, tags, setTag }) => {
  const myTags = tags.filter(tag => tag.id !== id);
  setTag(myTags);
};

export const handleCountrySelect = async ({ data, setStates, setCountry }) => {
  const countries = await apollo.query({
    query: allStateQuery,
    variables: {
      state: {
        country: data.id,
      },
    },
  });
  const myCountrires = countries.data.allStates.map(c => ({
    label: c.name,
    id: c.id,
  }));
  setStates(myCountrires);
  setCountry(data);
};

export const handleStateSelect = async ({ data, setState }) => {
  setState(data);
};

export const fetchLocations = async ({ setCountries }) => {
  const countries = await apollo.query({
    query: allCountriesQuery,
    variables: {},
  });
  const myCountrires = countries.data.allCountries.map(c => ({
    label: c.name,
    id: c.id,
  }));
  setCountries(myCountrires);
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

const mapProductorToApi = (values, userId) => ({
  user: userId,
  photo: values.avatar && values.avatar.url ? values.avatar.url : values.avatar,
  name: values.name,
  description: values.about,
  cpf: values.cpf,
  cnpj: values.cnpj,
  musical_styles: values.musicalStyles.map(({ id }) => id),
  status: basicInformationIsValid(values) ? 'INCOMPLETE' : 'ACTIVE',
});

export const handleCreateProductor = async (values, userId, setLoading) => {
  setLoading(true);
  const productor = { ...values };
  let newImage = null;

  if (productor.avatar && productor.avatar.file) {
    try {
      const base64 = await getBase64(productor.avatar.file);
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
    promise = await createProductor(data);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  console.log(promise);
  setLoading(false);
};

export const handleEditProductor = async (values, productorId, userId, setLoading) => {
  setLoading(true);
  const productor = { ...values };
  let newImage = null;

  if (productor.avatar && productor.avatar.file) {
    try {
      const base64 = await getBase64(productor.avatar.file);
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
    promise = await updateProductor(productorId, data);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  console.log('edited', promise);
  setLoading(false);
};
