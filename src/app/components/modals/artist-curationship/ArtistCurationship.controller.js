import apollo from '../../../apollo';
import { allSongsQuery } from './artistCurationship.query';

export const fetchSongs = async ({ artist, setSongs }) => {
  const songsPromise = await apollo.query({
    query: allSongsQuery,
    variables: { song: { artist: artist.id } },
  });
  setSongs(songsPromise.data.allSongs);
};

export const toDelete = '';
