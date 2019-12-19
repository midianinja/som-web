import gql from 'graphql-tag';

export const createProductorMutation = gql`
  mutation createProductor($productor: ProductorInput!) {
    createProductor(productor: $productor) {
      id
    }
  }
`;

export const updateProductorMutation = gql`
  mutation createProductor($productor: ProductorInput!) {
    createProductor(productor: $productor) {
      id
    }
  }
`;

export const todelete = '';
