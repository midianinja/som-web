import gql from 'graphql-tag';

const oneArtistQuery = gql`
  query($artist: ArtistInput){
    oneArtist( artist: $artist) {
      name
      hometown
    }
  }
`;

export default ({
  oneArtistQuery,
});
