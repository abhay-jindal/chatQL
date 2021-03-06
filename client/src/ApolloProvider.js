import { ApolloClient, InMemoryCache, ApolloProvider as Provider, createHttpLink ,split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws';

let httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />
}