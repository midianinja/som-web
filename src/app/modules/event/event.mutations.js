import gql from 'graphql-tag';

export const subscribe = gql`
  mutation subscribe($id: String!, $artistID: String!) {
    subscribeEvent(id: $id, artistID: $artistID) {
      id
      name
      about
      event_date
      has_food
      has_money_paid
      subscribe_closing_date
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
        avatar_image {
          mimified
          thumbnail
        }
        name
      }
      approved_artists {
        id
      }
      cover {
        mimified
      }
      photo {
        mimified
      }
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

export const unsubscribe = gql`
  mutation unsubscribe($id: String!, $artistID: String!) {
    unsubscribeEvent(id: $id, artistID: $artistID) {
      id
      name
      about
      event_date
      has_food
      has_money_paid
      subscribe_closing_date
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
        avatar_image {
          mimified
          thumbnail
        }
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
