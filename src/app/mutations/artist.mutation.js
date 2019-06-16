import gql from 'graphql-tag';

export const createArtistMutation = gql`
  mutation createArtist(
    $artist: ArtistInput!
  ) {
    createArtist(
      artist: $artist
    ) {
      id
      name
      members_number
      avatar_image
      about
      country
      state
      city
      musical_styles {
        id
        name
      }
    }
  }
`;

export const upadteArtistMutation = gql`
  mutation updateArtist(
    $artist_id: ID!
    $artist: ArtistInput!
  ) {
    updateArtist(
      artist_id: $artist_id
      artist: $artist
    ) {
      id
      name
      members_number
      avatar_image
      about
      country
      state
      city
      musical_styles {
        id
        name
      }
    }
  }
`;
