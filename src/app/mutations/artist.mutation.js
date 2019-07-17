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
      stage_map
      tec_rider
      kit
      avatar_image {
        mimified
        thumbnail
      }
      about
      country
      state
      city
      songs {
        id
        title
        url
      }
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
      stage_map
      tec_rider
      kit
      name
      members_number
      avatar_image {
        mimified
        thumbnail
      }
      songs {
        id
        url
        title
      }
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
