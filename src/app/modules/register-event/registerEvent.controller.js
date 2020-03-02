import moment from 'moment';
import apollo from '../../apollo';
import {
  createEvent, createLocation,
} from './registerEvent.repository';
import { validation } from './event.validate';
import { allCountriesQuery, allStateQuery } from './registerEvent.queries';
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

export const fetchCountries = async ({
  setCountries,
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

  setCountries(myCountries);
};

const mapEventToApi = (event, productor, location) => ({
  name: event.title,
  cover: event.cover.url,
  photo: event.avatar.url,
  oportunities: parseInt(event.openingsNumber, 10),
  event_date: new Date(moment(event.eventDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')),
  subscribe_closing_date: new Date(moment(event.closingSubscribeDate, 'DD/MM/YYYY')
    .format('YYYY-MM-DD HH:mm:ss')),
  end_event_date: event.endEventDate
    ? new Date(moment(event.endEventDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')) : null,
  about: event.description,
  productor,
  location,
  has_accommodation: event.hasAccomodation,
  has_food: event.hasFood,
  has_local_transportation: event.hasLocalTransportation,
  has_city_transportation: event.hasCityTransportation,
  has_money_paid: event.hasMoneyPaid,
  has_interstate_transportation: event.hasInterstateTransportation,
  has_international_transportation: event.hasInternationalTransportation,
});

export const handleCreateEvent = async (
  values, userId, setLoading, setErrors,
  setLocationId, dispatch, user,
) => {
  setLoading(true);
  const validate = validation(values);

  if (!validate.valid) {
    setErrors(validate.errors);
    setLoading(false);
    return;
  }

  const event = { ...values };
  let newAvatarImage = null;
  let newCoverImage = null;

  if (event.avatar && event.avatar.file) {
    try {
      const base64 = await getBase64(event.avatar.file);
      newAvatarImage = await uploadImageToStorage({
        file: base64,
        id: userId,
      });
    } catch (err) {
      // try
    }

    event.avatar = newAvatarImage.data.data.urls.mimified;
  }

  if (event.cover && event.cover.file) {
    try {
      const base64 = await getBase64(event.cover.file);
      newCoverImage = await uploadImageToStorage({
        file: base64,
        id: userId,
      });
    } catch (err) {
      // try
    }

    event.cover = newCoverImage.data.data.urls.mimified;
  }

  let locationResult;
  const location = {
    city: values.city,
    address: values.address,
    district: values.district,
    number: values.number,
    complement: values.complement,
    zipcode: values.zipcode,
    state: values.state.short_name,
    country: values.country.short_name,
  };

  try {
    locationResult = await createLocation(location);
  } catch (err) {
    // to be try
  }

  let promise;

  setLocationId(locationResult.data.createLocation.id);
  const data = mapEventToApi(event, user.productor.id, locationResult.data.createLocation.id);
  try {
    promise = await createEvent(data);
  } catch (err) {
    setLoading(false);
    throw err;
  }

  console.log(promise);
  // const newEvents = [...user.events];
  // newEvents.push(promise.data.createEvent);
  // dispatch({
  //   action: 'SET_USER',
  //   user: { ...user, events: newEvents },
  // });

  setLoading(false);
};
