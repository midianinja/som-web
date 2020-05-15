import { allowBodyScroll } from '../../../utilities/scroll';
import { subscribeMutation } from './subscribeButton.mutations';
import apollo from '../../../apollo';

export const subscribeAction = async ({
  user, event, dispatch, setDialog,
  history, onSuccess, onError,
}) => {
  try {
    if (!user) {
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
          setDialog({});
        },
      });
      return;
    }

    let resp;
    try {
      resp = await apollo.mutate({
        mutation: subscribeMutation,
        variables: {
          id: event.id,
          artistID: user.artist.id,
        },
      });
    } catch (err) {
      console.error([err]);
      throw err;
    }

    setDialog({
      title: 'Pronto!',
      icon: '/icons/yeah.svg',
      description: `Você está inscrito no festival ${event.name}. Fique ligado no SOM para receber novas informações.`,
      disagreeText: 'Ver mais eventos',
      disagreeAction: () => {
        allowBodyScroll();
        setDialog({});
      },
    });
    onSuccess({ subscribed_at_event: resp.data.subscribeEvent });
  } catch (err) {
    onError({ error: err });
  }
};

export const todelete = '';
