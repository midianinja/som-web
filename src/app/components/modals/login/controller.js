import gql from 'graphql-tag';
import { authorize } from './repository';
import { allowBodyScroll } from '../../../utilities/scroll';
import apollo from '../../../apollo';

export async function login(username, password, setError, closeModal, history) {
  let promise;
  try {
    promise = await authorize(username, password);
    console.log('promise: ', promise);
  } catch (err) {
    console.log('err ---: ', { err });
    throw err;
  }

  const { data, error } = await promise.json();
  console.log('error: ', error);
  console.log('data: ', data);
  const dataError = {};

  if (error && error === 'user/not-found') {
    dataError.username = 'Usuário não encontrado.';
    setError(dataError);
    return;
  }

  if (error && error === 'user/wrong-password') {
    dataError.password = 'Senha errada.';
    setError(dataError);
    return;
  }

  window.localStorage.setItem('som@ida', data.ida);
  window.localStorage.setItem('som@token', data.token);

  const artists = await apollo.query({
    query: gql`
      query($artist: ArtistInput){
        oneArtist( artist: $artist) {
          name
          hometown
          instagram_id
        }
      }
    `,
    variables: {},
  });
  console.log('artists: ', artists);

  allowBodyScroll();
  closeModal();
  history.push('/welcome');
}

export const ignore = null;
