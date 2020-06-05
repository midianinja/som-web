import apollo from '../../apollo';
import { getAllEventsQuery } from './myEvents.queries';

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

export const fetchEventsData = async ({
  setEvents, loading, setLoading,
  setDialog, user,
}) => {
  setLoading({ ...loading, event: loadingStatus.LOADING });
  let eventData;

  try {
    eventData = await apollo.query({
      query: getAllEventsQuery,
      variables: {
        event: { productor: user.productor.id },
        paginator: {
          limit: 20,
        },
      },
    });
    if (!eventData.data.allEvents.length) {
      setDialog({
        title: 'Nenhum evento encontrado',
        icon: '/icons/guita-error.svg',
        description: 'Logo teremos mais eventos, fique ligado para se inscrever.',
        disagreeText: 'Fechar',
        disagreeAction: () => setDialog({}),
      });
      return;
    }

    setEvents(eventData.data.allEvents);
    setLoading({
      ...loading,
      event: loadingStatus.LOADDED,
    });
  } catch (err) {
    // tratar esse erro
    console.error([err]);
    setLoading({ ...loading, event: loadingStatus.ERROR });
    throw err;
  }
};
