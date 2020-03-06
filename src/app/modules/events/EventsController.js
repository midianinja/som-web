import apollo from '../../apollo';
import { getAllEventsQuery, allCountriesQuery } from './events.queries';
import { allMusicalStyleOptionsQuery } from '../../queries/musicalGenres.query';
import { subscribeEvent, unsubscribeEvent } from './EventsRepository';
import { allowBodyScroll } from '../../utilities/scroll';

export const loadingStatus = {
  LOADDED: 0,
  LOADING: 1,
  ERROR: 2,
  TO_LOAD: 3,
};

export const initialLoading = {
  event: loadingStatus.TO_LOAD,
};

export const initialEvent = {
  cover: '',
  about: '',
  name: '-',
  event_date: Date.now(),
  location: {},
  subscribers: [],
  has_local_transportation: true,
  has_accommodation: true,
  has_food: true,
  productor: {
    name: '',
    photo: '',
    about: '',
    following: [],
    followers: [],
    location: {},
  },
};

export const removeTagAction = ({
  data, YEARS_MODEL, MONTH_MODEL,
  musicalStylesOptions, musicStyles,
  years, months, setMusicStyles,
  setYears, setMonths,
}) => {
  const month = MONTH_MODEL.find(m => m.id === data);
  const year = YEARS_MODEL.find(m => m.id === data);
  const style = musicalStylesOptions.find(m => m.id === data);

  if (month) {
    const myMonths = months.filter(m => m.id !== month.id);
    setMonths(myMonths);
  }

  if (year) {
    const myYears = years.filter(m => m.id !== year.id);
    setYears(myYears);
  }

  if (style) {
    const myStyles = musicStyles.filter(m => m.id !== style.id);
    setMusicStyles(myStyles);
  }
};

export const handleMusicalStyleSelect = ({
  data, musicalStylesOptions, musicStyles, setMusicStyles,
}) => {
  const colors = [
    'purple',
    'green',
    'orange',
    'magenta',
    'yellow',
  ];
  const style = musicalStylesOptions.find(o => (o.id === data.id));
  const newMusicalStyles = musicStyles.filter(o => (o.id !== data.id)).concat([{
    id: style.id,
    text: style.name,
    color: colors[Math.floor(Math.random() * 5)],
  }]);

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

  setMusicStyles(stylesWithColor);
};

export const fetchEventsData = async ({
  setEvents, loading, setLoading,
  setDialog, history, musicStyles,
  years, months,
}) => {
  setLoading({ ...loading, event: loadingStatus.LOADING });
  let eventData;

  try {
    eventData = await apollo.query({
      query: getAllEventsQuery,
      variables: {
        musical_styles: musicStyles.map(s => s.id),
        years: years.map(y => +y.id),
        months: months.map(m => ((+m.id) + 1)),
        paginator: {
          limit: 20,
        },
      },
    });
    console.log('eventData:', eventData)
    if (!eventData.data.searchEvents.length) {
      setDialog({
        title: 'Nenhum evento encontrado',
        icon: '/icons/guita-error.svg',
        description: 'Logo teremos mais eventos, fique ligado para se inscrever.',
        disagreeText: 'Fechar',
        disagreeAction: () => setDialog({}),
      });
      return;
    }

    setEvents(eventData.data.searchEvents);
    setLoading({
      ...loading,
      event: loadingStatus.LOADDED,
    });

  } catch (err) {
    // tratar esse erro
    setLoading({ ...loading, event: loadingStatus.ERROR });
    console.log([err]);
    throw err;
  }
};

export const subscribeAction = async (
  auth, user, event, dispatch, setDialog, setEvent,
  history,
) => {
  if (!auth) {
    dispatch({ type: 'SHOW_LOGIN_MODAL' });
    return;
  }

  if (!user.artist) {
    setDialog({
      title: 'Cadastro incompleto',
      icon: '/icons/guita-error.svg',
      description: 'Para se escrever em eventos, você precisa preencher os dados obrigatórios.',
      agreeText: 'Cadastrar',
      disagreeText: 'Voltar',
      confirmAction: () => {
        allowBodyScroll();
        history.push('/register-artist');
      },
      disagreeAction: () => {
        allowBodyScroll();
        setDialog(null);
      },
    });
    return;
  }

  try {
    const resp = await subscribeEvent(event.id, user.artist.id);
    console.log('resp:', resp);
  } catch (err) {
    throw err;
  }

  setDialog({
    title: 'Pronto!',
    icon: '/icons/yeah.svg',
    description: `Você está inscrito no festival ${event.name}. Fique ligado no SOM para receber novas informações.`,
    disagreeText: 'Voltar para a home',
    disagreeAction: () => {
      allowBodyScroll();
      history.push('/');
    },
  });

  const subs = [...event.subscribers];
  subs.push(user.artists[0].id);
  const newEvent = { ...event };
  newEvent.subscribers = subs;
  setEvent(newEvent);
};

export const unsubscribeAction = async (user, event, setEvent) => {
  try {
    await unsubscribeEvent(event.id, user.artist.id);
  } catch (err) {
    throw err;
  }

  const index = event.subscribers
    .findIndex(sub => sub === user.artist.id);

  const subs = [...event.subscribers];
  subs.splice(index, 1);

  const newEvent = { ...event };
  newEvent.subscribers = subs;
  setEvent(newEvent);
};

export const fetchMusicalStyleOptions = (setMusicalStylesOptions) => {
  apollo.query({
    query: allMusicalStyleOptionsQuery,
    variables: {},
  }).then(resp => setMusicalStylesOptions(resp.data.allMusicalStyleOptions));
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
