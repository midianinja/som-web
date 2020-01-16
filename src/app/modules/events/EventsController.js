import apollo from '../../apollo';
import { getAllEventsQuery } from './events.queries';
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

export const fetchEventsData = async (setEvent, loading, setLoading, setDialog, history) => {
  setLoading({ ...loading, event: loadingStatus.LOADING });
  let eventData;

  try {
    eventData = await apollo.query({
      query: getAllEventsQuery,
      variables: {
        paginator: {},
        event: {},
        advancedQuery: {},
      },
    });
    console.log('eventData:', eventData);
    if (!eventData.data.searchEvents.length) {
      console.log('.data:');
      setDialog({
        title: 'Evento não encontrado',
        icon: '/icons/guita-error.svg',
        description: 'Logo teremos mais eventos, fique ligado para se inscrever.',
        disagreeText: 'Ir para home',
        disagreeAction: () => history.push('/'),
      });
      return;
    }
  
    console.log('eventData.data.allEvents:', eventData.data.searchEvents);
    setEvent(eventData.data.searchEvents);
    setLoading({ ...loading, event: loadingStatus.LOADDED });
  } catch (err) {
    // tratar esse erro
    setLoading({ ...loading, event: loadingStatus.ERROR });
    console.log([err]);
    throw err;
  }

};

export const associatedEvents = async (id, setAssociatedEvents) => {
  setAssociatedEvents([]);
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
