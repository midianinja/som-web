import gql from 'graphql-tag';

export const subscribe = gql`
  mutation subscribe($id: ID!, $artistID: ID!) {
    subscribeEvent(id: $id, artistID: $artistID) {
      id
    }
  }
`;

export const unsubscribe = gql`
  mutation unsubscribe($id: ID!, $artistID: ID!) {
    unsubscribeEvent(id: $id, artistID: $artistID) {
      id
    }
  }
`;
