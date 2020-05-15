import { subscribeMutation } from './subscribeButton.mutations';
import apollo from '../../../apollo';

export const subscribeAction = async ({
  user, event, dispatch, setLoading,
  onSuccess, onError,
}) => {
  try {
    setLoading(true);
    if (!user) {
      dispatch({ type: 'SHOW_LOGIN_MODAL' });
      return;
    }

    if (!user.artist) {
      setLoading(false);
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

    setLoading(false);
    onSuccess({ subscribed_at_event: resp.data.subscribeEvent });
  } catch (err) {
    setLoading(false);
    onError({ error: err });
  }
};

export const todelete = '';
