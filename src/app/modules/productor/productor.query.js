import gql from 'graphql-tag';

export const oneProductorQuery = gql`
  query($productor: ProductorInput) {
    oneProductor (productor: $productor) {
      id
      photo
      name
      description
      musical_styles {
        id
        name
      }
      events {
        id
        cover {
          mimified
          thumbnail
        }
        photo {
          mimified
          thumbnail
        }
      }
      contact_email
      instagram
      whatsapp
      telegram
      facebook
      twitter
      youtube
      location {
        city
        state
        country
      }
    }
  }
`;

export default { oneProductorQuery };
