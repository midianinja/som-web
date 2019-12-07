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
    }
  }
`;

export default oneUserQuery;
