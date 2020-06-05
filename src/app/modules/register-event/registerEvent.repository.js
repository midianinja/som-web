import apollo from '../../apollo';
import {
  createEventMutation, createLocationMutation,
} from './event.mutation';

export const createEvent = event => apollo.mutate({
  mutation: createEventMutation,
  variables: {
    event,
  },
});

export const createLocation = location => apollo.mutate({
  mutation: createLocationMutation,
  variables: {
    location,
  },
});
