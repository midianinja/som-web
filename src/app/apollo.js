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

const link = createHttpLink({ uri: process.env.GRAPH_API_URI });
const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
});

export default new ApolloClient({ link, cache, defaultOptions });
