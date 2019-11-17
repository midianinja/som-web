import apollo from '../../apollo';
import queries from './artists.query';
import mutations from './artists.mutations';

const { followMutation, unfollowMutation } = mutations;
const { oneArtistQuery, allSongsQuery } = queries;

const fetchSongs = artist => apollo.query({
  query: allSongsQuery,
  variables: { song: { artist } },
});

export const fetchArtistData = async (
  id, setArtist, setArtistLoading, setSongs,
) => {
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
    promise = await fetch(`${process.env.INSTAGRAM_API_URI}/photos/${instaname}`);
  } catch (e) {
    throw e;
  }

  const { data } = await promise.json();
  setInstaPics(data);
  setInstagramLoading(false);
};

export const follow = async (artist, user, setFollows, follows) => {
  const newFollows = [...follows];
  newFollows.push(user);
  setFollows(newFollows);

  try {
    await apollo.mutate({
      mutation: followMutation,
      variables: { artist, user },
    });
  } catch (err) {
    throw err;
  }
};

export const unfollow = async (artist, user, setFollows, follows) => {
  const newFollows = [...follows];
  newFollows.splice(follows.indexOf(user), 1);
  setFollows(newFollows);

  try {
    await apollo.mutate({
      mutation: unfollowMutation,
      variables: { artist, user },
    });
  } catch (err) {
    console.log([err]);
    throw err;
  }
};
