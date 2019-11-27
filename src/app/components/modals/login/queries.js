import gql from 'graphql-tag';

export const oneUserQuery = gql`
  query($ida: String){
    oneUser(ida: $ida) {
      id
      ida
      type
      artist {
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
