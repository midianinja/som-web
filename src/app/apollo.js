import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const link = createHttpLink({ uri: 'http://192.168.1.20:4200/graphql' });
const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
});

export default new ApolloClient({ link, cache, defaultOptions });
