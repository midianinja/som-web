import gql from 'graphql-tag';

export const createEventMutation = gql`
  mutation ($event: EventInput!) {
    createEvent(event: $event) {
      id
      name
      about
      cover {
        original
        thumbnail
        mimified
      }
      photo {
        original
        thumbnail
        mimified
      }
      site
      oportunities
      event_date
      end_event_date
      subscribe_closing_date
      has_accommodation
      has_food
      has_local_transportation
      has_city_transportation
      has_money_paid
      has_interstate_transportation
      has_international_transportation
      location {
        id
        address
        number
        complement
        city
        state
        country
        zipcode
      }
      approved_artists {
        id
        user {
          id
        }
        avatar_image {
          mimified
          thumbnail
        }
        name
        about
      }
      subscribers {
        id
        user {
          id
        }
        avatar_image {
          mimified
          thumbnail
        }
        name
        about
      }
    }
  }
`;

export const createLocationMutation = gql`
  mutation ($location: LocationInput!) {
    createLocation(location: $location) {
      id
    }
  }
`;
