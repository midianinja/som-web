import gql from 'graphql-tag';

export const createSongMutation = gql`
  mutation createSong($song: SongInput!) {
    createSong(song: $song) {
      id
      url
      title
    }
  }
`;

export const todelete = '';
