import gql from 'graphql-tag';

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
