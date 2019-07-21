import gql from 'graphql-tag';

export const oneUserQuery = gql`
  query($ida: String){
    oneUser(ida: $ida) {
      id
      ida
      type
      artists {
        id
      }
    }
  }
`;

export default oneUserQuery;
