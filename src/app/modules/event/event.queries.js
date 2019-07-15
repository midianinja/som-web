import gql from 'graphql-tag';

export const getOneEventQuery = gql`
  query oneEvent($id: ID!) {
    oneEvent(id: $id) {
      id
      name
      event_date
      has_food
      has_money_paid
      has_accommodation
      has_city_transportation
      has_local_transportation
      subscribers {
        id
      }
      approved_artists {
        id
      }
      cover
      photo
    }
  }
`;

export const getAssociatedEvents = gql``;
