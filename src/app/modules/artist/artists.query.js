import gql from 'graphql-tag';

const oneArtistQuery = gql`
  query($artist: ArtistInput){
    oneArtist( artist: $artist) {
      name
      hometown
      instagram_id
    }
  }
`;

export default { oneArtistQuery };
