import apollo from '../apollo';
import { oneUserQuery } from './queries';

export async function getUser(ida) {
  return apollo.query({
    query: oneUserQuery,
    variables: {
      ida,
    },
  });
}

export default getUser;
