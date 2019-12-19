import apollo from '../../apollo';
import { createProductorMutation, updateProductorMutation } from './productor.mutation';

export const createProductor = productor => apollo.mutate({
  mutation: createProductorMutation,
  variables: {
    productor,
  },
});

export const updateProductor = (id, productor) => apollo.mutate({
  mutation: updateProductorMutation,
  variables: {
    productor_id: id,
    productor,
  },
});
