import gql from 'graphql-tag';

export const getAllEventsQuery = gql`
  query allEvents(
    $event: EventInput
    $paginator: PaginatorInput
  ) {
    allEvents(
      event: $event
      paginator: $paginator
    ) {
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

export const getAssociatedEvents = '';
