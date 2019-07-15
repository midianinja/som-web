import apollo from '../../apollo';
import { getOneEventQuery } from './event.queries';

export const DUMMY_ARTISTS = [
  {
    avatar: 'https://correioderondonia.com/wp-content/uploads/2018/12/Amy-Winehouse.jpg',
    name: 'Amy',
  },
  {
    avatar: 'https://statig0.akamaized.net/bancodeimagens/4f/xo/s2/4fxos2kg7q78ghtzkkbag7s2d.jpg',
    name: 'Pink Floyd',
  },
  {
    avatar: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/0/e/a/a/0eaa830937157f7cdb325f0591a56fd5.jpg',
    name: 'Led Zeppelin',
  },
  {
    avatar: 'https://followthecolours.com.br/wp-content/uploads/2016/06/follow-the-colours-the-beatles-experience-exposicao-sao-paulo-02.jpg',
    name: 'Beatles',
  },
  {
    avatar: 'https://cdns-images.dzcdn.net/images/artist/45227e89713b0c240f00c4ab33cadf2d/500x500.jpg',
    name: 'Raul Seixas',
  },
  {
    avatar: 'https://correioderondonia.com/wp-content/uploads/2018/12/Amy-Winehouse.jpg',
    name: 'Amy',
  },
  {
    avatar: 'https://statig0.akamaized.net/bancodeimagens/4f/xo/s2/4fxos2kg7q78ghtzkkbag7s2d.jpg',
    name: 'Pink Floyd',
  },
  {
    avatar: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/0/e/a/a/0eaa830937157f7cdb325f0591a56fd5.jpg',
    name: 'Led Zeppelin',
  },
  {
    avatar: 'https://followthecolours.com.br/wp-content/uploads/2016/06/follow-the-colours-the-beatles-experience-exposicao-sao-paulo-02.jpg',
    name: 'Beatles',
  },
  {
    avatar: 'https://cdns-images.dzcdn.net/images/artist/45227e89713b0c240f00c4ab33cadf2d/500x500.jpg',
    name: 'Raul Seixas',
  },
];

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
};

export const fetchEventData = async (id, setEvent, loading, setLoading) => {
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
    throw err;
  }

  setEvent(eventData.data.oneEvent);
  setLoading({ ...loading, event: loadingStatus.LOADDED });
};

export const associatedEvents = async (id, setAssociatedEvents) => {
  setAssociatedEvents([]);
};
