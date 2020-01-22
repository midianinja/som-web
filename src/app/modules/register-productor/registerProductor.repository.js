import apollo from '../../apollo';
import {
  createProductorMutation, updateProductorMutation, createLocationMutation,
  updateLocationMutation,
} from './productor.mutation';

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

export const createLocation = location => apollo.mutate({
  mutation: createLocationMutation,
  variables: {
    location,
  },
});

export const updateLocation = (id, location) => apollo.mutate({
  mutation: updateLocationMutation,
  variables: {
    id,
    location,
  },
});
