import apollo from '../../apollo';
import queries from './artists.query';

const { oneArtistQuery } = queries;

export const fetchArtistData = async (id, setArtistName, setHeaderLoading, setInstaUsername) => {
  let promise;
  setHeaderLoading(true);
  try {
    promise = await apollo.query({
      query: oneArtistQuery,
      variables: { id },
    });
  } catch (e) {
    throw e;
  }
  console.log('artistName', promise.data.oneArtist.name);
  setArtistName(promise.data.oneArtist.name);
  setInstaUsername(promise.data.oneArtist.instagram_id);
  setHeaderLoading(false);
};

export const fetchArtistInsta = async (instaname, setInstaPics, setInstagramLoading) => {
  let promise;
  setInstagramLoading(true);

  try {
    promise = await fetch(`http://localhost:8082/insta/media/${instaname}`);
  } catch (e) {
    throw e;
  }
  const data = await promise.json();
  setInstaPics(data.data);
  setInstagramLoading(false);
};
