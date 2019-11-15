import apollo from '../../apollo';
import queries from './artists.query';

const { oneArtistQuery, allSongsQuery } = queries;

const fetchSongs = artist => apollo.query({
  query: allSongsQuery,
  variables: { song: { artist } },
});

export const fetchArtistData = async (id, setArtist, setArtistLoading, setSongs) => {
  setArtistLoading(true);

  let promise;
  try {
    promise = await apollo.query({
      query: oneArtistQuery,
      variables: { id },
    });
  } catch (err) {
    throw err;
  }

  let songsPromise;
  try {
    songsPromise = await fetchSongs(promise.data.oneArtist.id);
  } catch (err) {
    console.log([err]);
    throw err;
  }

  setSongs(songsPromise.data.allSongs);
  setArtist(promise.data.oneArtist);
  setArtistLoading(false);
};

export const fetchArtistInstaImages = async (instaUri, setInstaPics, setInstagramLoading) => {
  let promise;
  setInstagramLoading(true);

  const instaname = instaUri.split('/').reverse()[0];
  try {
    promise = await fetch(`http://localhost:8082/insta/media/${instaname}`);
  } catch (e) {
    throw e;
  }

  const { data } = await promise.json();
  console.log(data);
  setInstaPics(data);
  setInstagramLoading(false);
};
