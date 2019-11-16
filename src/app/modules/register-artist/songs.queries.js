import gql from 'graphql-tag';

export const fetchCountriesQuery = gql`
  mutation allContries($song: SongInput!) {
    allContries(song: $song) {
      id
      url
      title
    }
  }
`;

export const todelete = '';
