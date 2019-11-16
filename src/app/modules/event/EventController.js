import apollo from '../../apollo';
import { getOneEventQuery } from './event.queries';
import { subscribeEvent, unsubscribeEvent } from './EventRepository';
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

export const fetchEventData = async (id, setEvent, loading, setLoading, setDialog, history) => {
  setLoading({ ...loading, event: loadingStatus.LOADING });
  let eventData;

  try {
    eventData = await apollo.query({
      query: getOneEventQuery,
      variables: { id },
    });
  } catch (err) {
    // tratar esse erro
    setLoading({ ...loading, event: loadingStatus.ERROR });
    console.log([err]);
    throw err;
  }

  if (!eventData.data.oneEvent) {
    setDialog({
      title: 'Evento não encontrado',
      icon: '/icons/guita-error.svg',
      description: 'Logo teremos mais eventos, fique ligado para se inscrever.',
      disagreeText: 'Ir para home',
      disagreeAction: () => history.push('/'),
    });
    return;
  }

  setEvent(eventData.data.oneEvent || { ...initialEvent });
  setLoading({ ...loading, event: loadingStatus.LOADDED });
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

  if (!user.artists || user.artists.length === 0) {
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
    await subscribeEvent(event.id, user.artists[0].id);
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
    await unsubscribeEvent(event.id, user.artists[0].id);
  } catch (err) {
    throw err;
  }

  const index = event.subscribers
    .findIndex(sub => sub === user.artists[0].id);

  const subs = [...event.subscribers];
  subs.splice(index, 1);

  const newEvent = { ...event };
  newEvent.subscribers = subs;
  setEvent(newEvent);
};
