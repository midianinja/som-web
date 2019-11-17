import gql from 'graphql-tag';

const followMutation = gql`
  mutation($user: ID!, $artist: ID!){
    followArtist(user: $user, artist: $artist) {
      id
      follows {
        user {
          id
        }
      }
    }
  }
`;

const unfollowMutation = gql`
  mutation($user: ID!, $artist: ID!){
    unfollowArtist(user: $user, artist: $artist) {
      id
      follows {
        user {
          id
        }
      }
    }
  }
`;

const allSongsQuery = gql`
  query($song: SongInput) {
    allSongs(song: $song) {
      id
      url
      title
      image {
        mimified
      }
    }
  }
`;

export default { followMutation, allSongsQuery, unfollowMutation };
