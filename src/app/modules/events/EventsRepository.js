import apollo from '../../apollo';
import { subscribe, unsubscribe } from './events.mutations';

export async function subscribeEvent(id, artistID) {
  return apollo.mutate({
    mutation: subscribe,
    variables: { id, artistID },
  });
}

export async function unsubscribeEvent(id, artistID) {
  return apollo.mutate({
    mutation: unsubscribe,
    variables: { id, artistID },
  });
}

export const ignore = null;
