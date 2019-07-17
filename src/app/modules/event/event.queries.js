import gql from 'graphql-tag';

export const getOneEventQuery = gql`
  query oneEvent($id: ID!) {
    oneEvent(id: $id) {
      id
      name
      about
      event_date
      has_food
      has_money_paid
      has_accommodation
      has_city_transportation
      has_local_transportation
      location {
        number
        address
        district
        city
        state
      }
      subscribers {
        id
        avatar_image
        name
      }
      approved_artists {
        id
      }
      cover
      photo
      productor {
        id
        photo
        name
        description
        followers {
          id
        }
        following {
          id
        }
        location {
          city
          state
        }
      }
    }
  }
`;

export const getAssociatedEvents = '';
