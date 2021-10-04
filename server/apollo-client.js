// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "localhost:3000",
    cache: new InMemoryCache(),
});

export default client;