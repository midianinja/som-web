import apollo from '../../apollo';
import { oneProductorQuery } from './productor.query';

export const fetchProductorData = async (
  id, setProductor, setProductorLoading, setAlertModal,
) => {
  setProductorLoading(true);

  let promise;
  try {
    promise = await apollo.query({
      query: oneProductorQuery,
      variables: { productor: { id } },
    });
  } catch (err) {
    setProductorLoading(false);
    throw err;
  }

  if (!promise.data.oneProductor) {
    setProductorLoading(false);
    setAlertModal({
      title: 'Ops!',
      icon: '',
      description: 'Produtor não encontrado',
      agreeText: 'OK',
      disagreeText: '',
      confirmAction: () => setAlertModal({}),
      disagreeAction: undefined,
      isOpen: true,
    });
    return;
  }

  setProductor(promise.data.oneProductor);
  setProductorLoading(false);
};

export const fetchProductorInstaImages = async (instaUri, setInstaPics) => {
  try {
    let promise;
    const instaname = instaUri.split('/').reverse()[0];

    try {
      promise = await fetch(`${process.env.INSTAGRAM_API_URI}/photos/${instaname}`);
    } catch (e) {
      throw e;
    }

    const { data } = await promise.json();
    setInstaPics(data);
  } catch (err) {
    console.log('err: ', err);
  }
};
