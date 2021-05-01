const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { IS_DEV, PORT } = require('./config')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

const server = new ApolloServer({ schema, playground: IS_DEV });

const app = express();
app.use(express.static('dist'))

server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}`));