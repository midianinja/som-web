import gql from 'graphql-tag';

export const oneUserQuery = gql`
  query($ida: String){
    oneUser(ida: $ida) {
      id
      ida
      type
      artist {
        id
      }
    }
  }
`;

export default oneUserQuery;
