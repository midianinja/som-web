import gql from 'graphql-tag';

export const oneUserQuery = gql`
  query($ida: String){
    oneUser(ida: $ida) {
      id
      ida
      type
      artist {
        id
        members_number
        about
        country
        state
        city
        musical_styles {
          name
          id
        }
        phone
        email
        songs {
          title
          url
        }
        spotify_id
        id
        name
        avatar_image {
          mimified
          thumbnail
        }
        facebook
        twitter
        instagram
        youtube
      }
      productor {
        id
        name
        photo
        musical_styles {
          id
          name
        }
        description
        status
        cpf
        cnpj
      }
    }
  }
`;

export default oneUserQuery;
