import gql from 'graphql-tag';

const oneArtistQuery = gql`
  query($artist: ArtistInput!){
    oneArtist(artist: $artist) {
      id
      name
      avatar_image {
        mimified
        thumbnail
      }
      facebook
      twitter
      instagram
      youtube
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

export default { oneArtistQuery, allSongsQuery };
