import gql from 'graphql-tag';

export const getAllEventsQuery = gql`
  query searchEvents(
    $musical_styles: [ID]
    $years: [Int]
    $months: [Int]
    $event: EventInput
    $paginator: PaginatorInput
  ) {
    searchEvents(
      musical_styles: $musical_styles
      years: $years
      months: $months
      event: $event
      paginator: $paginator
    ) {
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

export const allCountriesQuery = gql`
    query allCountries($country: CountryInput) {
        allCountries(country: $country) {
        name
        id
        short_name
        shortName
        pattern
        pattern_name
        }
    }
`;

export const allCitiesQuery = gql`
    query allCities($city: CityInput) {
        allCities(city: $city) {
        name
        id
        }
    }
`;

export const allStateQuery = gql`
    query allStates($state: StateInput) {
        allStates(state: $state) {
        name
        id
        short_name
        }
    }
`;


export const getAssociatedEvents = '';
