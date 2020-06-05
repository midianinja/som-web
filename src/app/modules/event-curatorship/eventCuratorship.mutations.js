import gql from 'graphql-tag';
import { eventType } from './eventCuratorship.query';

export const reproveArtistMutation = gql`
mutation reproveArtist(
  $event_id: String!
  $artist_id: String!
) {
  reproveArtist(
    event_id: $event_id
    artist_id: $artist_id
  ){
    ${eventType}
  }
}
`;

export const approveArtistMutation = gql`
  mutation aproveArtist(
    $event_id: String!
    $artist_id: String!
  ){
    aproveArtist(
      event_id: $event_id
      artist_id: $artist_id
    )
    {
      ${eventType}
    }
  }
`;

export const resetSubscriptionMutation = gql`
  mutation resetSubscriptionEvent(
    $event_id: String!
    $artist_id: String!
  ){
    resetSubscriptionEvent(
      event_id: $event_id
      artist_id: $artist_id
    )
    {
      ${eventType}
    }
  }
`;
